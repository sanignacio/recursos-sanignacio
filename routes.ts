/**
 * An array of routes that are accessible to the public
 * These routes does not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = ["/", "/auth/email-verification"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect signed in users to DEFAULT_SIGNIN_REDIRECT
 * @type {string[]}
 */
export const authRoutes: string[] = [
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/error",
  "/auth/forgot-password",
  "/auth/reset-password",
];

export const completeProfileRoute = "/auth/complete-profile";

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_SIGNIN_REDIRECT = "/settings";
