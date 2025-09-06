"use server";

import { db } from "~/server/db";
import { currentUser } from "~/lib/authentication";

interface ChangeOAuthAccountParams {
  provider: "google";
}

export async function changeOAuthAccount({
  provider,
}: ChangeOAuthAccountParams) {
  const user = await currentUser();

  if (!user) {
    return { error: "No autorizado." };
  }

  if (!provider) {
    return { error: "Debe indicar un proveedor OAuth." };
  }

  await db.account.deleteMany({
    where: {
      userId: user.id,
      provider,
    },
  });

  return { success: true };
}
