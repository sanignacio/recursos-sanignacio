import NextAuth from "next-auth";

import { authConfig } from "~/server/auth/config";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_SIGNIN_REDIRECT,
  publicRoutes,
} from "@/routes";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isSignedIn = !!req.auth;
  const userRole = req.auth?.user?.role;

  console.log(req.auth);

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // Skip middleware for API authentication endpoints
  if (isApiAuthRoute) {
    return null;
  }

  // Redirect signed-in users away from authentication pages
  if (isAuthRoute) {
    if (isSignedIn) {
      return Response.redirect(new URL(DEFAULT_SIGNIN_REDIRECT, nextUrl));
    }
    return null; // Allow access if not signed in
  }

  // Treat users not signed in or without role as unauthenticated
  if (!isSignedIn || (!userRole && !isPublicRoute)) {
    // Redirect unauthenticated users to sign-in and users with no role to complete-profile
    let redirectPath = !isSignedIn ? "/auth/sign-in" : "/auth/complete-profile";
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) callbackUrl += nextUrl.search;
    redirectPath += `?callbackUrl=${encodeURIComponent(callbackUrl)}`;

    return Response.redirect(new URL(redirectPath, nextUrl));
  }

  // Allow access if user is signed in or route is public
  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
