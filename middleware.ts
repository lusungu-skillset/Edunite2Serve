import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  // Check if request comes through the admin subdomain (e.g., admin.edunite2serve.org or admin.localhost:3000)
  const isAdminSubdomain =
    hostname.startsWith("admin.") ||
    hostname.startsWith("admin-") ||
    hostname.includes("admin.localhost");

  const isAdminPath = url.pathname.startsWith("/admin");
  const isAdmin = isAdminSubdomain || isAdminPath;

  // Clone headers so we can pass metadata to server components
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-is-admin", isAdmin ? "true" : "false");
  requestHeaders.set("x-pathname", url.pathname);

  // Skip static assets, Next.js internal files, and APIs
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname.includes(".") ||
    url.pathname.startsWith("/favicon.ico")
  ) {
    return NextResponse.next();
  }

  // If visiting via the admin subdomain:
  if (isAdminSubdomain) {
    // If the path doesn't already start with /admin, rewrite it internally
    if (!url.pathname.startsWith("/admin")) {
      url.pathname = `/admin${url.pathname === "/" ? "" : url.pathname}`;
      return NextResponse.rewrite(url, {
        request: {
          headers: requestHeaders,
        },
      });
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
