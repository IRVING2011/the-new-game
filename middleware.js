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

  // IP合法就放行
}
