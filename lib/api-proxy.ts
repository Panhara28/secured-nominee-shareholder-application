const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:8080";

function buildHeaders(request: Request, extra?: HeadersInit): Headers {
  const headers = new Headers(extra);
  const cookie = request.headers.get("cookie");
  if (cookie) headers.set("cookie", cookie);
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  return headers;
}

function forwardSetCookies(nestRes: Response, res: Response) {
  // Response.headers.getSetCookie() is the correct way to read multiple
  // Set-Cookie headers (a plain .get() would merge them into one string).
  const setCookies =
    typeof (nestRes.headers as any).getSetCookie === "function"
      ? (nestRes.headers as any).getSetCookie()
      : [];
  for (const cookie of setCookies) {
    res.headers.append("set-cookie", cookie);
  }
}

function extractCookieValue(setCookieHeader: string, name: string): string | null {
  const match = setCookieHeader.match(new RegExp(`^${name}=([^;]*)`));
  return match ? match[1] : null;
}

function replaceCookieValue(cookieHeader: string, name: string, newValue: string): string {
  const parts = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .filter((part) => part && !part.startsWith(`${name}=`));
  parts.push(`${name}=${newValue}`);
  return parts.join("; ");
}

/**
 * Access tokens expire after 15 minutes (see JWT_ACCESS_EXPIRES_IN in the
 * API). Without this, any request made after that window comes back 401 even
 * though the 7-day refresh_token cookie is still valid, and callers were
 * left showing raw "unauthorized"/generic error states instead of quietly
 * staying logged in.
 */
async function refreshSessionCookie(
  cookieHeader: string,
  nestPath: string,
): Promise<string | null> {
  const refreshPath = nestPath.startsWith("/secured/admin")
    ? "/secured/admin/auth/refresh"
    : "/portal/auth/refresh";

  const res = await fetch(`${API_BASE_URL}${refreshPath}`, {
    method: "POST",
    headers: { cookie: cookieHeader },
    redirect: "manual",
  });
  if (!res.ok) return null;

  const setCookies =
    typeof (res.headers as any).getSetCookie === "function" ? (res.headers as any).getSetCookie() : [];
  return setCookies.find((c: string) => c.startsWith("session=")) ?? null;
}

/**
 * Runs `fetch`, and on a 401 (and only when a refresh_token cookie is
 * present and this isn't an auth endpoint itself, to avoid refresh loops)
 * transparently refreshes the access token and retries once. Returns the
 * final response plus the refreshed `session` Set-Cookie header, if any, so
 * callers can forward it to the browser.
 */
async function fetchWithAutoRefresh(
  target: string,
  init: RequestInit & { headers: Headers },
  nestPath: string,
): Promise<{ response: Response; refreshedSessionCookie: string | null }> {
  const response = await fetch(target, init);
  if (response.status !== 401 || nestPath.includes("/auth/")) {
    return { response, refreshedSessionCookie: null };
  }

  const cookieHeader = init.headers.get("cookie");
  if (!cookieHeader || !cookieHeader.includes("refresh_token=")) {
    return { response, refreshedSessionCookie: null };
  }

  const refreshedSessionCookie = await refreshSessionCookie(cookieHeader, nestPath);
  if (!refreshedSessionCookie) {
    return { response, refreshedSessionCookie: null };
  }

  const newSessionValue = extractCookieValue(refreshedSessionCookie, "session");
  if (!newSessionValue) {
    return { response, refreshedSessionCookie: null };
  }

  const retryHeaders = new Headers(init.headers);
  retryHeaders.set("cookie", replaceCookieValue(cookieHeader, "session", newSessionValue));
  const retryResponse = await fetch(target, { ...init, headers: retryHeaders });
  return { response: retryResponse, refreshedSessionCookie };
}

/**
 * Thin proxy: forwards a Next.js API route request to the NestJS API,
 * piping back status/body/cookies unchanged. `nestPath` must start with "/".
 */
export async function proxyRequest(
  request: Request,
  nestPath: string,
  opts?: { body?: unknown; stripFields?: string[] },
): Promise<Response> {
  const url = new URL(request.url);
  const target = `${API_BASE_URL}${nestPath}${url.search}`;

  let bodyToSend: BodyInit | undefined;
  const headers = buildHeaders(request);

  if (request.method !== "GET" && request.method !== "HEAD") {
    let payload: unknown = opts?.body;
    if (payload === undefined) {
      payload = await request.json().catch(() => undefined);
    }
    if (payload !== undefined && payload !== null) {
      if (opts?.stripFields?.length) {
        const record = { ...(payload as Record<string, unknown>) };
        for (const field of opts.stripFields) delete record[field];
        payload = record;
      }
      bodyToSend = JSON.stringify(payload);
      headers.set("content-type", "application/json");
    }
  }

  const { response: nestRes, refreshedSessionCookie } = await fetchWithAutoRefresh(
    target,
    { method: request.method, headers, body: bodyToSend, redirect: "manual" },
    nestPath,
  );

  const contentType = nestRes.headers.get("content-type") ?? "application/json";
  const buffer = await nestRes.arrayBuffer();
  const res = new Response(buffer, {
    status: nestRes.status,
    headers: { "content-type": contentType },
  });
  forwardSetCookies(nestRes, res);
  if (refreshedSessionCookie) res.headers.append("set-cookie", refreshedSessionCookie);
  return res;
}

/**
 * Streams a Server-Sent Events response from the NestJS API through to the
 * browser without buffering. Route files using this must also export
 * `export const dynamic = "force-dynamic";`.
 */
export async function proxyStream(request: Request, nestPath: string): Promise<Response> {
  const url = new URL(request.url);
  const target = `${API_BASE_URL}${nestPath}${url.search}`;
  const headers = buildHeaders(request);

  const { response: nestRes, refreshedSessionCookie } = await fetchWithAutoRefresh(
    target,
    { method: "GET", headers, redirect: "manual" },
    nestPath,
  );

  if (!nestRes.body) {
    return new Response(null, { status: nestRes.status });
  }

  const res = new Response(nestRes.body, {
    status: nestRes.status,
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
  forwardSetCookies(nestRes, res);
  if (refreshedSessionCookie) res.headers.append("set-cookie", refreshedSessionCookie);
  return res;
}

/**
 * Passes through a binary response (e.g. the certificate PDF) unchanged.
 */
export async function proxyBinary(request: Request, nestPath: string): Promise<Response> {
  const url = new URL(request.url);
  const target = `${API_BASE_URL}${nestPath}${url.search}`;
  const headers = buildHeaders(request);

  const { response: nestRes, refreshedSessionCookie } = await fetchWithAutoRefresh(
    target,
    { method: "GET", headers, redirect: "manual" },
    nestPath,
  );
  const buffer = await nestRes.arrayBuffer();

  const res = new Response(buffer, {
    status: nestRes.status,
    headers: {
      "Content-Type": nestRes.headers.get("content-type") ?? "application/octet-stream",
      "Content-Disposition": nestRes.headers.get("content-disposition") ?? "inline",
    },
  });
  forwardSetCookies(nestRes, res);
  if (refreshedSessionCookie) res.headers.append("set-cookie", refreshedSessionCookie);
  return res;
}
