import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  //todo: redirect to login page if the user is not authenticated
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return await updateSession(request);
}

export const config = {
  matcher: ["/"],
};
