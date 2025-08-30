import { Resend } from "resend";

import { EmailVerification } from "~/components/emails/email-verification";
import { PasswordReset } from "~/components/emails/email-password-reset";
import { TwoFactorAuthentication } from "~/components/emails/email-two-factor-authentication";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.AUTH_URL;

export async function sendVerificationEmail(
  name: string | null,
  email: string,
  token: string,
) {
  const verifyLink = `${domain}/auth/email-verification?token=${token}`;

  await resend.emails.send({
    from: "San Ignacio Recursos <confirmation@recursos.sanignacio.edu.uy>",
    to: [email],
    subject: "Verificación de Email",
    react: EmailVerification({ name, verifyLink }),
  });
}

export async function sendPasswordResetEmail(
  name: string | null,
  email: string,
  token: string,
) {
  const resetLink = `${domain}/auth/reset-password?token=${token}`;

  await resend.emails.send({
    from: "San Ignacio Recursos <reset@recursos.sanignacio.edu.uy>",
    to: [email],
    subject: "Restablecimiento de Contraseña",
    react: PasswordReset({ name, resetLink }),
  });
}

export async function sendTwoFactorTokenEmail(
  name: string | null,
  email: string,
  token: string,
) {
  await resend.emails.send({
    from: "San Ignacio Recursos <2fa@recursos.sanignacio.edu.uy>",
    to: [email],
    subject: "Código de Autenticación de Dos Factores",
    react: TwoFactorAuthentication({ name, token }),
  });
}
