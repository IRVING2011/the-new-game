import { NextResponse } from "next/server";

export function middleware(req) {

  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "";

  const whitelist = (process.env.IP_WHITELIST || "").split(",");

  if (!whitelist.includes(ip)) {
    return NextResponse.redirect(new URL("/403.html", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/game.html"]
};
