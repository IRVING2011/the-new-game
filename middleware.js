const WHITELIST = (process.env.IP_WHITELIST || "").split(",")

export const config = {
  matcher: "/:path*"
}

export default function middleware(req) {

  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    ""

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

  // 如果沒有登入 session
  if (!cookie.includes("session=valid")) {

    const url = new URL(req.url)

    if (url.pathname !== "/login.html" && !url.pathname.startsWith("/api/auth")) {
      return Response.redirect(new URL("/login.html", req.url))
    }

  }

}