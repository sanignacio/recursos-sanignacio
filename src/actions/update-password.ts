"use server";

import bcrypt, { compare } from "bcryptjs";
import type * as z from "zod";

import { getUserById } from "~/data/user";
import { currentUser } from "~/lib/authentication";
import { db } from "~/server/db";
import { type UpdatePasswordSchema } from "~/schemas";
import { update } from "~/server/auth";
import { getSession } from "next-auth/react";

export async function updatePassword(
  values: z.infer<typeof UpdatePasswordSchema>,
) {
  const user = await currentUser();

  if (!user) {
    return { error: "No autorizado." };
  }

  if (user.isOAuth) {
    return { error: "No autorizado." };
  }

  const dbUser = await getUserById(user.id!);

  if (!dbUser?.password) {
    return { error: "No autorizado." };
  }

  const passwordsMatch = await compare(values.currentPassword, dbUser.password);

  if (!passwordsMatch) {
    return { error: "Contraseña incorrecta." };
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(values.newPassword, salt);

  const updatedUser = await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
      role: updatedUser.role,
    },
  });
  await getSession();

  return { success: "Contraseña actualizada." };
}
