import * as z from 'zod';
import { UserRole } from '@prisma/client';

export const SignInSchema = z.object({
  email: z.string().email({
    message: 'Se requiere un correo electrónico válido.'
  }),
  password: z.string().min(1, {
    message: 'Se requiere contraseña.'
  }),
  code: z.optional(z.string())
});

export const SignUpSchema = z
  .object({
    email: z.string().email({
      message: 'Se requiere un correo electrónico válido.'
    }),
    password: z.string().min(8, {
      message: 'Se requieren un mínimo de 8 caracteres.'
    }),
    confirm: z.string().min(8, {
      message: 'Se requieren un mínimo de 8 caracteres.'
    }),
    name: z.string().min(1, {
      message: 'El nombre es obligatorio.'
    })
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirm']
  });

export const ForgotPasswordSchema = z.object({
  email: z.string().email({
    message: 'Se requiere un correo electrónico válido.'
  })
});

export const ResetPasswordSchema = z
  .object({
    password: z.string().min(8, {
      message: 'Se requieren un mínimo de 8 caracteres.'
    }),
    confirm: z.string().min(8, {
      message: 'Se requieren un mínimo de 8 caracteres.'
    })
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirm']
  });

export const UpdateProfileSchema = z.object({
  name: z.string().min(1, {
    message: 'El nombre es obligatorio.'
  }),
  email: z.string().email({
    message: 'Se requiere un correo electrónico válido.'
  }),
  role: z.enum([UserRole.ADMIN, UserRole.USER]),
  isTwoFactorEnabled: z.boolean()
});

export const UpdatePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: 'Se requieren un mínimo de 8 caracteres.'
    }),
    newPassword: z.string().min(8, {
      message: 'Se requieren un mínimo de 8 caracteres.'
    }),
    confirmPassword: z.string().min(8, {
      message: 'Se requieren un mínimo de 8 caracteres.'
    })
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirm']
  });
