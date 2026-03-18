import { NextResponse } from "next/server"

export function middleware(request) {
  return new NextResponse("Middleware Working", { status: 403 })
}