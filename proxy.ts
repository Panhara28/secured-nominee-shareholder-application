import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

// Cookie name issued by the NestJS API (see src/lib/auth.ts in
// secured-nominee-shareholder-api). Middleware only checks for presence -
// real verification (signature, expiry, role) happens on every API call via
// JwtAuthGuard/PermissionsGuard; an invalid/expired token still 401s there
// and the affected page should redirect to login.
const API_SESSION_COOKIE_NAME = "session";

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

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathWithoutLocale = stripLocale(pathname);
  const hasSession = Boolean(request.cookies.get(API_SESSION_COOKIE_NAME)?.value);

  if (
    pathWithoutLocale.startsWith("/portal") &&
    !PUBLIC_PORTAL_PATHS.has(pathWithoutLocale)
  ) {
    if (!hasSession) {
      return NextResponse.redirect(new URL("/en/portal/login", request.url));
    }
  }

  if (
    pathWithoutLocale.startsWith("/secured/admin") &&
    !PUBLIC_ADMIN_PATHS.has(pathWithoutLocale)
  ) {
    if (!hasSession) {
      return NextResponse.redirect(
        new URL("/en/secured/admin/login", request.url),
      );
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
  allowedDevOrigins: ["192.168.0.109"],
};
