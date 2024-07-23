import { NextResponse } from "next/server";

export async function middleware(request) {
  const url = new URL(request.url).pathname;
  let protected_url = ["/events, /admin"];
  if (protected_url.includes(url)) {
    let authCookie = request.cookies.get("auth_session");
    if (!authCookie) {
      return NextResponse.redirect(new URL("/signup", request.url));
    }
    // if (url === "/admin" && user.role !== "admin") {
    //   return NextResponse.redirect(new URL("/", request.url));
    // }
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    `/((?!api|_next/static|_next/image|favicon.ico).*)`,
  ],
};
