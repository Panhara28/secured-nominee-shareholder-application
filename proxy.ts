import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Cookie names issued by the NestJS API (see src/lib/auth.ts in
// secured-nominee-shareholder-api). Admin and portal use distinct names so
// that logging into one doesn't overwrite the other's cookie in the same
// browser.
const PORTAL_SESSION_COOKIE_NAME = "session";
const PORTAL_REFRESH_COOKIE_NAME = "refresh_token";
const ADMIN_SESSION_COOKIE_NAME = "admin_session";
const ADMIN_REFRESH_COOKIE_NAME = "admin_refresh_token";

const PUBLIC_PORTAL_PATHS = new Set([
  "/portal/login",
  "/portal/register",
  "/portal/forgot-password",
  "/portal/reset-password",
]);

const PUBLIC_ADMIN_PATHS = new Set(["/secured/admin/login"]);

function stripLocale(pathname: string): string {
  const match = pathname.match(/^\/(en)(\/.*)?$/);
  return match ? (match[2] ?? "/") : pathname;
}

// Decodes a JWT's payload without verifying its signature - only used to
// read `exp` so we know whether it's worth attempting a refresh. Real
// verification (signature, expiry, role) still happens on every API call
// via JwtAuthGuard/PermissionsGuard.
function decodeJwtExpiry(token: string): number | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const decoded = JSON.parse(atob(padded)) as { exp?: number };
    return typeof decoded.exp === "number" ? decoded.exp : null;
  } catch {
    return null;
  }
}

const EXPIRY_SKEW_SECONDS = 10;

function isSessionExpired(token: string | undefined): boolean {
  if (!token) return true;
  const exp = decodeJwtExpiry(token);
  if (exp === null) return true;
  return exp * 1000 <= Date.now() + EXPIRY_SKEW_SECONDS * 1000;
}

// Access tokens expire after 60 minutes; the 7-day refresh_token cookie is
// what keeps a full-page load from bouncing an otherwise-active user to the
// login screen. Mirrors the retry done for client-side fetches in
// lib/api-proxy.ts, but here we refresh proactively since middleware is the
// only place allowed to set cookies before a page navigation completes.
async function tryRefreshSession(
  scope: "portal" | "admin",
  sessionToken: string | undefined,
  refreshToken: string,
): Promise<string | null> {
  const apiBaseUrl = process.env.API_BASE_URL ?? "http://localhost:8080";
  const refreshPath = scope === "admin" ? "/secured/admin/auth/refresh" : "/portal/auth/refresh";
  const sessionCookieName = scope === "admin" ? ADMIN_SESSION_COOKIE_NAME : PORTAL_SESSION_COOKIE_NAME;
  const refreshCookieName = scope === "admin" ? ADMIN_REFRESH_COOKIE_NAME : PORTAL_REFRESH_COOKIE_NAME;
  const cookieHeader = [
    sessionToken ? `${sessionCookieName}=${sessionToken}` : null,
    `${refreshCookieName}=${refreshToken}`,
  ]
    .filter(Boolean)
    .join("; ");

  try {
    const res = await fetch(`${apiBaseUrl}${refreshPath}`, {
      method: "POST",
      headers: { cookie: cookieHeader },
    });
    if (!res.ok) return null;
    const setCookie = res.headers.get("set-cookie");
    if (!setCookie) return null;
    const match = setCookie.match(new RegExp(`^${sessionCookieName}=([^;]+)`));
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathWithoutLocale = stripLocale(pathname);

  const isPortalRoute =
    pathWithoutLocale.startsWith("/portal") && !PUBLIC_PORTAL_PATHS.has(pathWithoutLocale);
  const isAdminRoute =
    pathWithoutLocale.startsWith("/secured/admin") && !PUBLIC_ADMIN_PATHS.has(pathWithoutLocale);

  const sessionCookieName = isAdminRoute ? ADMIN_SESSION_COOKIE_NAME : PORTAL_SESSION_COOKIE_NAME;
  const refreshCookieName = isAdminRoute ? ADMIN_REFRESH_COOKIE_NAME : PORTAL_REFRESH_COOKIE_NAME;

  let sessionToken = request.cookies.get(sessionCookieName)?.value;
  const refreshToken = request.cookies.get(refreshCookieName)?.value;
  let refreshedSessionValue: string | null = null;

  if ((isPortalRoute || isAdminRoute) && isSessionExpired(sessionToken) && refreshToken) {
    refreshedSessionValue = await tryRefreshSession(
      isAdminRoute ? "admin" : "portal",
      sessionToken,
      refreshToken,
    );
    if (refreshedSessionValue) sessionToken = refreshedSessionValue;
  }

  const hasSession = Boolean(sessionToken);

  // Mutate the request's own cookie jar (not just the outgoing response) so
  // that Server Components rendered later in this same request - e.g. the
  // portal/admin layouts, which read cookies() directly - see the refreshed
  // session instead of the expired one they arrived with.
  if (refreshedSessionValue) {
    request.cookies.set(sessionCookieName, refreshedSessionValue);
  }

  let response: NextResponse;
  if (isPortalRoute && !hasSession) {
    response = NextResponse.redirect(new URL("/en/portal/login", request.url));
  } else if (isAdminRoute && !hasSession) {
    response = NextResponse.redirect(new URL("/en/secured/admin/login", request.url));
  } else {
    response = intlMiddleware(request);
  }

  if (refreshedSessionValue) {
    response.cookies.set(sessionCookieName, refreshedSessionValue, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: request.nextUrl.protocol === "https:",
      // Must stay numerically in sync with ACCESS_TOKEN_COOKIE_MAX_AGE_MS in
      // secured-nominee-shareholder-api/src/lib/auth.ts.
      maxAge: 60 * 60,
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
  allowedDevOrigins: ["192.168.0.109"],
};
