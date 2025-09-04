import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  pixelBasedPreset,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface VerificationProps {
  name: string | null;
  verifyLink: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const VerificationEmail = ({ name, verifyLink }: VerificationProps) => {
  const previewText = `Verificación de correo electrónico`;

  return (
    <Html>
      <Head />
      <Tailwind
        config={{
          presets: [pixelBasedPreset],
        }}
      >
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Preview>{previewText}</Preview>
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/logo.png`}
                width="40"
                height="37"
                alt="Logo Recursos San Ignacio"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Verifica tu correo electrónico de{" "}
              <strong>Recursos San Ignacio</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hola {name},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Se creo una cuenta con tu dirección de correo electrónico.
              Queremos asegurarnos de que seas tú. Haz clic en el botón de abajo
              para verificar tu dirección de correo electrónico.
            </Text>
            <Section className="mt-[32px] mb-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={verifyLink}
              >
                Verificar
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              o copia y pega esta URL en tu navegador:{" "}
              <Link href={verifyLink} className="text-blue-600 no-underline">
                {verifyLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              Si no fue usted, simplemente ignore y elimine este mensaje. Para
              mantener su cuenta segura, no reenvíe este correo electrónico a
              nadie.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

VerificationEmail.PreviewProps = {
  name: "test",
  verifyLink: "https://link.com",
} as VerificationProps;

export default VerificationEmail;
