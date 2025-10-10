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
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user: {
      tempEmail: string | null;
      role: UserRole | null;
      passes: number;
      isTwoFactorEnabled: boolean;
      isOAuth: boolean;
      hasCredentials: boolean;
    } & DefaultSession["user"];
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    GoogleProvider({
      allowDangerousEmailAccountLinking: true,
    }),
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
      if (
        typeof user.email !== "string" ||
        !user.email.endsWith("@sanignacio.edu.uy")
      ) {
        // The email domain should be sanignacio.edu.uy and email should be a string
        return false;
      }

      // Skip email verification check for OAuth
      if (account?.provider !== "credentials") {
        return true;
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
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.passes = (token.passes as number) ?? 0;
      }

      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.tempEmail = token.tempEmail as string | null;
        session.user.isOAuth = token.isOAuth as boolean;
        session.user.hasCredentials = token.hasCredentials as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.hasCredentials = !!existingUser.password;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.tempEmail = existingUser.tempEmail;
      token.role = existingUser.role;
      token.passes = existingUser.passes;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
} satisfies NextAuthConfig;
