import { NextResponse } from "next/server";
/* 
*Custom Middleware
export function middleware(request: Request) {
  return NextResponse.redirect(new URL("/about", request.url));
  }*/

import { auth } from "@/app/_lib/auth";
export const middleware = auth;
export const config = {
  matcher: ["/account"],
};
