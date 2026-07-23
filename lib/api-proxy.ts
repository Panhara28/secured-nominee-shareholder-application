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

  const nestRes = await fetch(target, {
    method: request.method,
    headers,
    body: bodyToSend,
    redirect: "manual",
  });

  const contentType = nestRes.headers.get("content-type") ?? "application/json";
  const buffer = await nestRes.arrayBuffer();
  const res = new Response(buffer, {
    status: nestRes.status,
    headers: { "content-type": contentType },
  });
  forwardSetCookies(nestRes, res);
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

  const nestRes = await fetch(target, { method: "GET", headers, redirect: "manual" });

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
  return res;
}

/**
 * Passes through a binary response (e.g. the certificate PDF) unchanged.
 */
export async function proxyBinary(request: Request, nestPath: string): Promise<Response> {
  const url = new URL(request.url);
  const target = `${API_BASE_URL}${nestPath}${url.search}`;
  const headers = buildHeaders(request);

  const nestRes = await fetch(target, { method: "GET", headers, redirect: "manual" });
  const buffer = await nestRes.arrayBuffer();

  const res = new Response(buffer, {
    status: nestRes.status,
    headers: {
      "Content-Type": nestRes.headers.get("content-type") ?? "application/octet-stream",
      "Content-Disposition": nestRes.headers.get("content-disposition") ?? "inline",
    },
  });
  forwardSetCookies(nestRes, res);
  return res;
}
