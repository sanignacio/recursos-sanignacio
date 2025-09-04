import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import EmailFooter from "./email-footer";
import { EmailHeader } from "./email-header";

interface TwoFactorAuthenticationProps {
  name: string | null;
  token: string;
}

export function TwoFactorAuthentication({
  name,
  token,
}: TwoFactorAuthenticationProps) {
  return (
    <Html>
      <Head>
        <title>Autenticación de dos factores</title>
      </Head>
      <Preview>
        Ingrese el siguiente código para terminar de iniciar sesión en su cuenta
      </Preview>
      <Tailwind>
        <Body className="bg-white font-sans text-gray-900">
          <Container className="mx-auto my-0 max-w-[480px] px-0 pt-5 pb-12">
            <EmailHeader />

            <Text className="text-xl">
              Hola{" "}
              <strong>{typeof name === "string" ? name : "Usuario"}</strong>,
              continua iniciando sesión en su cuenta ingresando el siguiente
              código.
            </Text>

            <Section className="rounded-md border border-solid border-gray-300 p-6 text-center">
              <Text className="m-0 mb-3 text-left">
                ¡Saludos de <strong>Recursos San Ignacio</strong>!
              </Text>
              <Text className="m-0 mb-3 text-left">
                Alguien intentó iniciar sesión recientemente en su cuenta de
                Recursos San Ignacio. Si fue usted, utilice el código a
                continuación para continuar con el registro.
              </Text>

              <Text className="inline-flex rounded bg-zinc-100 px-5 py-2 text-center text-xl font-bold">
                {token}
              </Text>
            </Section>

            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
