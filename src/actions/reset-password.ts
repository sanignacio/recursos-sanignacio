'use server'

import bcrypt from 'bcryptjs'
import * as z from 'zod'

import { getPasswordResetTokenByToken } from '@/data/password-reset-token'
import { getUserByEmail } from '@/data/user'
import { db } from '@/lib/db'
import { ResetPasswordSchema } from '@/schemas'

export async function resetPassword(
  values: z.infer<typeof ResetPasswordSchema>,
  token?: string | null,
) {
  if (!token) {
    return { error: 'Falta el token.' }
  }

  const validatedFields = ResetPasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Campos inválidos.' }
  }

  const { password } = validatedFields.data

  const existingToken = await getPasswordResetTokenByToken(token)

  if (!existingToken) {
    return { error: 'Token inválido.' }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return { error: 'El token ha expirado.' }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return { error: 'El correo electrónico no existe.' }
  }

  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
  const hashedPassword = await bcrypt.hash(password, salt)

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      password: hashedPassword,
    },
  })

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  })

  return { success: 'Contraseña restablecida exitosamente.' }
}
