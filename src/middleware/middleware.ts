import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './lib/auth'

const protectedRoutes = {
  '/dashboard/client': ['client'],
  '/dashboard/artist': ['artist'],
  '/dashboard/manager': ['manager'],
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  for (const route in protectedRoutes) {
    if (pathname.startsWith(route)) {
      const token = request.cookies.get('token')?.value
      const decoded = token ? verifyToken(token) : null

      if (!decoded || !protectedRoutes[route].includes(decoded.role)) {
        return NextResponse.redirect(new URL('/login', request.url))
      }
    }
  }

  return NextResponse.next()
}
