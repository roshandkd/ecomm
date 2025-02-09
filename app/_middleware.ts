import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Protect the cart page
  if (pathname.startsWith("/cart")) {
    const token = req.cookies.get("token");
    if (!token) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }
  return NextResponse.next();
}
