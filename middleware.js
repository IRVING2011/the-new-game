const WHITELIST = (process.env.IP_WHITELIST || "").split(",")
export const config = {
  matcher: "/:path*"
}

export default function middleware(req) {
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    ""

  // 檢查 IP 是否在白名單中
  if (!WHITELIST.includes(ip)) {
    return new Response(
      JSON.stringify({ error: "IP not allowed" }),
      {
        status: 403,
        headers: { "content-type": "application/json" }
      }
    )
  }

  const cookie = req.headers.get("cookie") || ""

  // 如果沒有登入 session，則跳轉到登入頁
  if (!cookie.includes("session=valid")) {
    const url = new URL(req.url)

    if (url.pathname !== "/login.html" && !url.pathname.startsWith("/api/auth")) {
      return Response.redirect(new URL("/login.html", req.url))
    }
  }
}
