"use server";

import type * as z from "zod";

import { getUserByEmail } from "~/data/user";
import { sendPasswordResetEmail } from "~/lib/mail";
import { generatePasswordResetToken } from "~/lib/tokens";
import { ForgotPasswordSchema } from "~/schemas";

export async function forgotPassword(
  values: z.infer<typeof ForgotPasswordSchema>,
) {
  const validatedFields = ForgotPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Correo electrónico no válido." };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "El correo electrónico no existe." };
  }

  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    existingUser.name,
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return {
    success: "Enlace de restablecimiento enviado a su correo electrónico.",
  };
}
