import bcrypt from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'

import { getUserByEmail } from '@/data/user'
import { SignInSchema } from '@/schemas'

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    credentials({
      async authorize(credentials) {
        const validatedFields = SignInSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { email, password } = validatedFields.data

          const user = await getUserByEmail(email)

          if (!user || !user.password) {
            return null
          }

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (passwordsMatch) {
            return user
          }
        }

        return null
      },
    }),
  ],
}

export default authConfig
