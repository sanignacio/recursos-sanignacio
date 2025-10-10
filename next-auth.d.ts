import { UserRole } from "@prisma/client";
import { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  tempEmail: string | null;
  role: UserRole | null;
  passes: number;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  hasCredentials: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
