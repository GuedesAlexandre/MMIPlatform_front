import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/dashboard", "/users", "/resources", "3Dpages"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  if (request.nextUrl.pathname.startsWith("/elements")) {
    return NextResponse.next();
  }
  if (token && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (
    !token &&
    protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
