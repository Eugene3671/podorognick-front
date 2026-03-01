import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privateRoutes = ["/profile", "/my", "/edit"];

export function proxy(request: NextRequest) {
  console.log("MIDDLEWARE:", request.nextUrl.pathname);
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;

  const isPrivate = privateRoutes.some(route =>
    pathname === route || pathname.startsWith(route + "/")
  );

  if (!accessToken && isPrivate) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/edit/:path*"],
};