import {
  Body,
  Button,
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

interface EmailVerificationProps {
  name: string | null;
  verifyLink: string;
}

export function EmailVerification({
  name,
  verifyLink,
}: EmailVerificationProps) {
  return (
    <Html>
      <Head>
        <title>Verificación de correo electrónico</title>
      </Head>
      <Preview>
        Verifique la dirección de correo electrónico de su cuenta de Recursos
        San Ignacio
      </Preview>
      <Tailwind>
        <Body className="bg-white font-sans text-gray-900">
          <Container className="mx-auto my-0 max-w-[480px] px-0 pt-5 pb-12">
            <EmailHeader />

            <Text className="text-xl">
              Hola{" "}
              <strong>{typeof name === "string" ? name : "Usuario"}</strong>,
              hay una cuenta registrada con su correo electrónico.
            </Text>

            <Section className="rounded-md border border-solid border-gray-300 p-6 text-center">
              <Text className="m-0 mb-3 text-left">
                ¡Saludos de <strong>Recursos San Ignacio</strong>!
              </Text>
              <Text className="m-0 mb-3 text-left">
                Se registró una cuenta de Recursos San Ignacio con tu dirección
                de correo electrónico. Queremos asegurarnos de que seas tú. Haz
                clic en el botón de abajo para verificar tu dirección de correo
                electrónico.
              </Text>

              <Button
                href={verifyLink}
                className="rounded-md bg-gray-900 px-6 py-2 text-sm font-semibold text-white"
              >
                Verificar
              </Button>
            </Section>

            <EmailFooter />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
