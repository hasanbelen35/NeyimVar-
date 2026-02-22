import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


const protectedRoutes = ['/dashboard', '/user', '/settings',
  '/edit-profile', '/my-profile', '/notes'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}