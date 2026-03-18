import { NextResponse } from "next/server"

export function middleware(request) {

  const whitelist = process.env.IP_WHITELIST?.split(",")

  const ip =
    request.headers.get("x-forwarded-for") ||
    request.ip

  if (!whitelist || !whitelist.includes(ip)) {
    return new NextResponse("Access Denied", { status: 403 })
  }

  return NextResponse.next()
}