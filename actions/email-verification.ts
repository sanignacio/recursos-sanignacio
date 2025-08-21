'use server';

import { db } from '@/lib/db';
import { getUserById } from '@/data/user';
import { getVerificationTokenByToken } from '@/data/verification-token';

export async function emailVerification(token: string) {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: 'El token no existe.' };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: 'El token expiro.' };
  }

  const existingUser = await getUserById(existingToken.userId);

  if (!existingUser) {
    return { error: 'El correo electrónico no existe.' };
  }

  await db.user.update({
    where: {
      id: existingUser.id
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.isUpdateEmail ? existingUser.tempEmail : undefined,
      tempEmail: existingToken.isUpdateEmail ? null : undefined
    }
  });

  await db.verificationToken.delete({
    where: {
      id: existingToken.id
    }
  });

  return { success: 'Correo electrónico verificado correctamente. Ya puedes iniciar sesión.' };
}
