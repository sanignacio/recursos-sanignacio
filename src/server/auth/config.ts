import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  type DefaultSession,
  type NextAuthConfig,
  type Account,
  type User,
} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { db } from "~/server/db";
import type { UserRole } from "@prisma/client";

import bcrypt from "bcryptjs";
import { getUserByEmail } from "~/data/user";
import { SignInSchema } from "~/schemas";

import { getAccountByUserId } from "~/data/account";
import { getTwoFactorConfirmationByUserId } from "~/data/two-factor-confirmation";
import { getUserById } from "~/data/user";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session {
    user: {
      tempEmail: string | null;
      role: UserRole | null;
      isTwoFactorEnabled: boolean;
      isOAuth: boolean;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    GoogleProvider,
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Google provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/google
     */
    CredentialsProvider({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          if (!user?.password) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }: { user: User; account?: Account | null }) {
      // If is OAuth user
      if (account?.provider !== "credentials") {
        // Only allow access to users with @sanignacio.edu.uy email and verified email
        if (
          account?.emailVerified &&
          typeof account.email === "string" &&
          account.email.endsWith("@sanignacio.edu.uy")
        )
          return true;
        // Prevent sign in if not @sanignacio.edu.uy email or email not verified
        return false;
      }

      const existingUser = await getUserById(user.id!);

      // Prevent unverified email sign in
      if (!existingUser?.emailVerified) {
        return false;
      }

      // Check if 2FA enabled
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id,
        );

        // Prevent unconfirmed 2FA sign in
        if (!twoFactorConfirmation) {
          return false;
        }

        // Delete 2FA confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ token, trigger, session }) {
      if (trigger === "update" && session.user.role) {
        session.user.role = token.role as UserRole;
      }

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.role = token.role as UserRole;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.tempEmail = token.tempEmail as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token, trigger, session }) {
      if (trigger === "update" && session.user.role) {
        token.role = session.role as UserRole;
      }
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.tempEmail = existingUser.tempEmail;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
} satisfies NextAuthConfig;
