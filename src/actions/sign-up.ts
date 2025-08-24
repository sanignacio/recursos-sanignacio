'use server'

import * as z from 'zod'
import bcrypt from 'bcryptjs'

import { db } from '@/lib/db'
import { SignUpSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'
import { sendVerificationEmail } from '@/lib/mail'
import { generateVerificationToken } from '@/lib/tokens'

const SignUpSchemaWithDomain = SignUpSchema //.refine(
//  (data) => data.email.endsWith('@sanignacio.edu.uy'),
//  {
//    message: 'El email debe ser @sanignacio.edu.uy.',
//    path: ['email']
//  }
//);

export async function signUp(values: z.infer<typeof SignUpSchema>) {
  const validatedFields = SignUpSchemaWithDomain.safeParse(values)

  if (!validatedFields.success) {
    return { error: validatedFields.error.errors[0].message }
  }

  const { email, password, name, role } = validatedFields.data

  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
  const hashedPassword = await bcrypt.hash(password, salt)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'El correo electrónico ya existe.' }
  }

  const newUser = await db.user.create({
    data: {
      name,
      email,
      role,
      password: hashedPassword,
    },
  })

  if (!newUser || !newUser.email) {
    return { error: '¡Ups! Algo salió mal.' }
  }

  const verificationToken = await generateVerificationToken(newUser.id)

  //const verifyLink = `http://localhost:3000/auth/email-verification?token=${verificationToken.token}`;
  //console.log(`Verification link: ${verifyLink}`);

  await sendVerificationEmail(
    newUser.name,
    newUser.email,
    verificationToken.token,
  )

  return {
    success: 'Registro exitoso. Revisa tu correo electrónico para verificar.',
  }
}
