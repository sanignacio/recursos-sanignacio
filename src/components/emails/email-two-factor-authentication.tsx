import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  pixelBasedPreset,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface TwoFactorAuthenticationProps {
  name: string | null;
  token: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const TwoFactorAuthenticationEmail = ({
  name,
  token,
}: TwoFactorAuthenticationProps) => {
  const previewText = `Autenticación de dos pasos`;

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
              Termine de iniciar sesión en su cuenta de{" "}
              <strong>Recursos San Ignacio</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hola {name},
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Alguien intentó iniciar sesión recientemente en su cuenta de
              Recursos San Ignacio. Si fuiste vos, usa este código
            </Text>
            <Section className="mt-[32px] mb-[32px] text-center">
              <Text className="text-[14px] leading-[12px] text-black">
                Código de verificación
              </Text>
              <Text className="text-[36px] leading-[24px] font-bold text-black">
                {token}
              </Text>
            </Section>
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

TwoFactorAuthenticationEmail.PreviewProps = {
  name: "test",
  token: "123456789",
} as TwoFactorAuthenticationProps;

export default TwoFactorAuthenticationEmail;
