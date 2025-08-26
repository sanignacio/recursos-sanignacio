"use server";

import type * as z from "zod";

import { getUserByEmail, getUserById } from "~/data/user";
import { currentUser } from "~/lib/authentication";
import { db } from "~/server/db";
import { sendVerificationEmail } from "~/lib/mail";
import { generateVerificationToken } from "~/lib/tokens";
import { type UpdateProfileSchema } from "~/schemas";
import { update } from "~/server/auth";

export async function updateProfile(
  values: z.infer<typeof UpdateProfileSchema>,
) {
  const user = await currentUser();

  if (!user) {
    return { error: "No autorizado." };
  }

  const dbUser = await getUserById(user.id!);

  if (!dbUser) {
    return { error: "No autorizado." };
  }

  let updateEmail = false;

  if (values.email && values.email !== user.email) {
    updateEmail = true;
  }

  if (updateEmail) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "El correo electrónico ya existe." };
    }

    const verificationToken = await generateVerificationToken(dbUser.id, true);

    await sendVerificationEmail(
      values.name,
      values.email,
      verificationToken.token,
    );
  }

  const updatedUser = await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      name: values.name,
      tempEmail: user.isOAuth || !updateEmail ? undefined : values.email,
      role: values.role,
      isTwoFactorEnabled: user.isOAuth ? undefined : values.isTwoFactorEnabled,
    },
  });

  update({
    user: {
      name: updatedUser.name,
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
      role: updatedUser.role,
    },
  });

  return {
    success: !updateEmail
      ? "Perfil actualizado."
      : "Perfil actualizado y correo electrónico de verificación enviado.",
  };
}
