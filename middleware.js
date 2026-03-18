import { NextResponse } from "next/server"

const WHITELIST = (process.env.IP_WHITELIST || "").split(",")

export const config = {
  matcher: "/:path*"
}

export default function middleware(req) {

  // 取得 IP
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    ""

  // 取得網址
  const url = new URL(req.url)

  // ===== IP 白名單檢查 =====
  if (WHITELIST.length && !WHITELIST.includes(ip)) {
    return NextResponse.redirect(
      new URL("/403.html", req.url)
    )
  }

  // ===== Session 檢查 =====
  const cookie = req.headers.get("cookie") || ""

  if (!cookie.includes("session=valid")) {

    if (
      url.pathname !== "/login.html" &&
      url.pathname !== "/403.html" &&
      !url.pathname.startsWith("/api/auth")
    ) {
      return NextResponse.redirect(
        new URL("/login.html", req.url)
      )
    }

  }

  return NextResponse.next()
}
