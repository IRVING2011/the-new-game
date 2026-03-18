const WHITELIST = (process.env.IP_WHITELIST || "").split(",")

export const config = {
  matcher: "/:path*"
}

export default function middleware(req) {

  const url = new URL(req.url)

  // 這些頁面不檢查
  if (
    url.pathname === "/403.html" ||
    url.pathname === "/login.html" ||
    url.pathname.startsWith("/api")
  ) {
    return
  }

  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    ""

  // IP不在白名單
  if (!WHITELIST.includes(ip)) {
    return Response.redirect(new URL("/403.html", req.url))
  }

  const cookie = req.headers.get("cookie") || ""

  // 沒登入
  if (!cookie.includes("session=valid")) {
    return Response.redirect(new URL("/login.html", req.url))
  }

}
