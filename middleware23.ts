import { NextResponse } from "next/server";
export default function middleware(request: any) {
  console.log(request.nextUrl.pathname);
  //if (request.nextUrl.pathname !== "/login") {
  return NextResponse.redirect(new URL("/", request.url));
  //}
}

export const config = {
  matcher: ["/clientInServer/:path*"],
};
