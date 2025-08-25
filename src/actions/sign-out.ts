"use server";

import { signOut as logOut } from "~/server/auth";

export async function signOut() {
  await logOut();
}
