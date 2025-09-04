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

interface PasswordResetProps {
  name: string | null;
  resetLink: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const PasswordResetEmail = ({ name, resetLink }: PasswordResetProps) => {
  const previewText = `Restablecer contraseña`;

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
              Restablece tu contraseña de <strong>Recursos San Ignacio</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hola {name},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Alguien recientemente solicitó un cambio de contraseña para su
              cuenta de Recursos San Ignacio. Si fue usted, haga clic en el
              botón de abajo para establecer una nueva contraseña.
            </Text>
            <Section className="mt-[32px] mb-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={resetLink}
              >
                Restablecer contraseña
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              o copia y pega esta URL en tu navegador:{" "}
              <Link href={resetLink} className="text-blue-600 no-underline">
                {resetLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              Si no querés cambiar tu contraseña o no lo solicitó, simplemente
              ignore y elimine este mensaje. Para mantener su cuenta segura, no
              reenvíe este correo electrónico a nadie.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

PasswordResetEmail.PreviewProps = {
  name: "test",
  resetLink: "https://link.com",
} as PasswordResetProps;

export default PasswordResetEmail;
