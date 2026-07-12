import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { verifySessionToken, SESSION_COOKIE_NAME } from "./lib/auth";

const intlMiddleware = createMiddleware(routing);

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

  if (
    pathWithoutLocale.startsWith("/portal") &&
    !PUBLIC_PORTAL_PATHS.has(pathWithoutLocale)
  ) {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const session = verifySessionToken(token);
    if (!session || session.role !== "SHAREHOLDER") {
      return NextResponse.redirect(new URL("/en/portal/login", request.url));
    }
  }

  if (
    pathWithoutLocale.startsWith("/secured/admin") &&
    !PUBLIC_ADMIN_PATHS.has(pathWithoutLocale)
  ) {
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    const session = verifySessionToken(token);
    if (!session || session.role !== "ADMIN") {
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
