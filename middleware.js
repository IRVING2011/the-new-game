export const config = {
  matcher: "/:path*"
}

export default function middleware(req) {

  const WHITELIST = (process.env.IP_WHITELIST || "").split(",")

  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    ""

  const url = new URL(req.url)

  // ===== IP 白名單 =====
  if (WHITELIST.length && !WHITELIST.includes(ip)) {

    return Response.redirect(
      new URL("/403.html", req.url),
      302
    )

  }

  const cookie = req.headers.get("cookie") || ""

  // ===== 未登入 =====
  if (!cookie.includes("session=valid")) {

    if (
      url.pathname !== "/login.html" &&
      url.pathname !== "/403.html" &&
      !url.pathname.startsWith("/api/auth")
    ) {

      return Response.redirect(
        new URL("/login.html", req.url),
        302
      )

    }

  }

}
