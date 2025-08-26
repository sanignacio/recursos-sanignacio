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
  // Unauthenticated users can only access public routes
  // Not signed in users are redirected to /auth/sign-in
  // Signed in users with no role are redirected to /auth/complete-profile
  // If the route is public, allow access

  if (isPublicRoute) {
    return null;
  }

  const callbackUrl = nextUrl.pathname + nextUrl.search;

  if (!isSignedIn) {
    const signInUrl = new URL("/auth/sign-in", nextUrl.origin);
    signInUrl.searchParams.set("callbackUrl", callbackUrl);
    return Response.redirect(signInUrl);
  }

  console.log("User role:", userRole);

  if (!userRole) {
    const completeProfileUrl = new URL(
      "/auth/complete-profile",
      nextUrl.origin,
    );
    completeProfileUrl.searchParams.set("callbackUrl", callbackUrl);
    return Response.redirect(completeProfileUrl);
  }

  // Otherwise allow access
  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
