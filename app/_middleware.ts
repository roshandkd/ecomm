import { NextResponse } from "next/server";
import { getAuthStatus } from "./auth/auth";

// //old
// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   // Protect the cart page
//   if (pathname.startsWith("/cart")) {
//     const token = req.cookies.get("token");
//     if (!token) {
//       return NextResponse.redirect(new URL("/auth/login", req.url));
//     }
//   }
//   return NextResponse.next();
// }

//new
export async function middleware(request: Request) {
  const { pathname } = new URL(request.url);
  const isAuthenticated = await getAuthStatus();

  if (pathname.startsWith("/cart") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

    // Protect logout action
    if (pathname === '/logout' && !isAuthenticated) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

  return NextResponse.next();
}
