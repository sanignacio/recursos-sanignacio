'use server';

import * as z from 'zod';
import { AuthError } from 'next-auth';

import {
  generateTwoFactorToken,
  generateVerificationToken
} from '@/lib/tokens';
import { db } from '@/lib/db';
import { SignInSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import { signIn as authSignIn } from '&/auth';
import { DEFAULT_SIGNIN_REDIRECT } from '&/routes';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { sendTwoFactorTokenEmail, sendVerificationEmail } from '@/lib/mail';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';

export async function signIn(
  values: z.infer<typeof SignInSchema>,
  callbackUrl?: string | null
) {
  const validatedFields = SignInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Campos inválidos.' };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: 'El correo electrónico no existe.' };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.id);

    await sendVerificationEmail(
      existingUser.name,
      existingUser.email,
      verificationToken.token
    );

    return { success: 'Correo electrónico de confirmación enviado.' };
  }

  // Check if 2FA enabled
  if (existingUser.email && existingUser.isTwoFactorEnabled) {
    // If verifying 2FA code
    if (code) {
      // Verify the 2FA code
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: 'Código inválido.' };
      }

      if (twoFactorToken.token !== code) {
        return { error: 'Código inválido.' };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: 'El código ha expirado.' };
      }

      // Delete 2FA token
      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id
        }
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      if (existingConfirmation) {
        // Delete existing 2FA confirmation
        await db.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id
          }
        });
      }

      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id
        }
      });
    }
    // If not verifying 2FA code
    else {
      // Send 2FA code mail
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(
        existingUser.name,
        twoFactorToken.email,
        twoFactorToken.token
      );

      return { twoFactor: true };
    }
  }

  try {
    await authSignIn('credentials', {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_SIGNIN_REDIRECT
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Correo electrónico o contraseña incorrectos.' };
        default:
          return { error: '¡Ups! Algo salió mal.' };
      }
    }

    throw error;
  }
}
