export const config = {
  matcher: "/:path*"
}

export default function middleware(request) {
  return new Response("Middleware Working", {
    status: 403
  })
}
