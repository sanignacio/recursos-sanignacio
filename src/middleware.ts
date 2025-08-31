import NextAuth from "next-auth";

import { authConfig } from "~/server/auth/config";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_SIGNIN_REDIRECT,
  publicRoutes,
  completeProfileRoute,
} from "@/routes";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isSignedIn = !!req.auth;
  const hasRole = !!req.auth?.user.role;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isCompleteProfileRoute = nextUrl.pathname == completeProfileRoute;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Allow access to API auth routes
  if (isApiAuthRoute) {
    return null;
  }

  if (isAuthRoute) {
    // Redirect authenticated users away from auth pages
    if (isSignedIn) {
      return Response.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, nextUrl));
    }
    return null;
  }

  // Redirect signed in users without a role and
  // not signed in users away from complete-profile page
  if (isCompleteProfileRoute) {
    if (isSignedIn && !hasRole) return null;
    else return Response.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, nextUrl));
  }

  // Redirect users not signed in to auth page if the route is not public
  if (!isSignedIn && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/sign-in?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }

  // Redirect signed in users without a role to complete-profile if the route is not public
  if (isSignedIn && !hasRole && !isPublicRoute) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(
        `/auth/complete-profile?callbackUrl=${encodedCallbackUrl}`,
        nextUrl,
      ),
    );
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
