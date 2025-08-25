"use server";

import type * as z from "zod";

import { getUserById } from "~/data/user";
import { currentUser } from "~/lib/authentication";
import { db } from "~/server/db";
import { type CompleteProfileSchema } from "~/schemas";
import { update } from "~/server/auth";
import { getSession } from "next-auth/react";

export async function completeProfile(
  values: z.infer<typeof CompleteProfileSchema>,
) {
  const user = await currentUser();

  if (!user) {
    return { error: "No autorizado." };
  }

  if (!user.isOAuth) {
    return { error: "No autorizado." };
  }

  const dbUser = await getUserById(user.id!);

  if (!dbUser) {
    return { error: "No autorizado." };
  }

  const updatedUser = await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      role: values.role,
    },
  });

  update({
    user: {
      role: updatedUser.role,
    },
  });
  await getSession();

  return { success: "Perfil completado." };
}
