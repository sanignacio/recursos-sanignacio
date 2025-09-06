"use server";

import bcrypt from "bcryptjs";
import type * as z from "zod";

import { getUserByEmail } from "~/data/user";
import { db } from "~/server/db";
import { sendVerificationEmail } from "~/lib/mail";
import { generateVerificationToken } from "~/lib/tokens";
import { SignUpSchema } from "~/schemas";

export async function signUp(values: z.infer<typeof SignUpSchema>) {
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error:
        validatedFields.error?.errors?.[0]?.message ?? "Error de validación.",
    };
  }

  const { email, password, name, role } = validatedFields.data;

  const saltRounds = 10; // More = secure but slower, A LOT SLOWER
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "El correo electrónico ya existe." };
  }

  const newUser = await db.user.create({
    data: {
      name,
      email,
      role,
      password: hashedPassword,
    },
  });

  if (!newUser?.email) {
    return { error: "¡Ups! Algo salió mal." };
  }

  const verificationToken = await generateVerificationToken(newUser.id);

  await sendVerificationEmail(
    newUser.name,
    newUser.email,
    verificationToken.token,
  );

  return {
    success: "Registro exitoso. Revisa tu correo electrónico para verificar.",
  };
}
