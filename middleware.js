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
  const path = url.pathname

  // ===== 先放行這些頁面（避免無限跳轉） =====
  if (
    path === "/login.html" ||
    path === "/403.html" ||
    path.startsWith("/api/auth") ||
    path.startsWith("/style") ||
    path.startsWith("/game.js")
  ) {
    return
  }

  // ===== IP 白名單 =====
  if (WHITELIST.length && !WHITELIST.includes(ip)) {
    return Response.redirect(
      new URL("/403.html", req.url),
      302
    )
  }

  // ===== Session 檢查 =====
  const cookie = req.headers.get("cookie") || ""

  if (!cookie.includes("session=valid")) {
    return Response.redirect(
      new URL("/login.html", req.url),
      302
    )
  }

}
