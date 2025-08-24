import NextAuth, { NextAuthRequest } from 'next-auth'

import {
  authRoutes,
  publicRoutes,
  apiAuthPrefix,
  DEFAULT_SIGNIN_REDIRECT,
} from '&/routes'
import authConfig from '&/auth.config'

export const { auth } = NextAuth(authConfig)

export default auth((req: NextAuthRequest) => {
  const { nextUrl } = req
  const isSignedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  // Skip middleware for API authentication endpoints
  if (isApiAuthRoute) {
    return null
  }

  // Redirect signed-in users away from authentication pages
  if (isAuthRoute) {
    if (isSignedIn) {
      return Response.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, nextUrl))
    }
    return null // Allow access if not signed in
  }

  // Redirect unauthenticated users to the sign-in page for protected routes
  if (!isSignedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) {
      callbackUrl += nextUrl.search // Preserve query parameters
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)

    return Response.redirect(
      new URL(`/auth/sign-in?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    )
  }

  // Allow access if user is signed in or route is public
  return null
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
