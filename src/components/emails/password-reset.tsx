import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components';

const baseUrl = process.env.AUTH_URL;

interface PasswordResetProps {
  name: string | null;
  resetLink: string;
}

export function PasswordReset({ name, resetLink }: PasswordResetProps) {
  return (
    <Html>
      <Head>
        <title>Restablecer contraseña</title>
      </Head>
      <Preview>Restablecer la contraseña de su cuenta de Recursos San Ignacio</Preview>
      <Tailwind>
        <Body className='bg-white text-gray-900 font-sans'>
          <Container className='max-w-[480px] my-0 mx-auto pt-5 pb-12 px-0'>
            <Link href={baseUrl} className='flex items-center text-gray-800'>
              <Img
                src={`${baseUrl}/shield-check.png`}
                width='32'
                height='32'
                className='mr-1 -ml-1'
                alt='Auth'
              />
              <Heading as='h1' className='text-3xl font-bold m-0'>
                Auth
              </Heading>
            </Link>

            <Text className='text-xl'>
              Hola <strong>{typeof name === 'string' ? name : 'User'}</strong>,
              tu cuenta ha solicitado un cambio de contraseña.
            </Text>

            <Section className='p-6 border-solid border border-gray-300 rounded-md text-center'>
              <Text className='m-0 mb-3 text-left'>
                ¡Saludos de <strong>Recursos San Ignacio</strong>!
              </Text>
              <Text className='m-0 mb-3 text-left'>
                Alguien recientemente solicitó un cambio de contraseña para su cuenta
                de Recursos San Ignacio. Si fue usted, haga clic en el botón de abajo
                para establecer una nueva contraseña.
              </Text>

              <Button
                href={resetLink}
                className='text-sm font-semibold bg-gray-900 rounded-md text-white py-2 px-6'
              >
                Restablecer contraseña
              </Button>

              <Text className='m-0 my-3 text-left'>
                Si no desea cambiar su contraseña o no lo solicitó,
                simplemente ignore y elimine este mensaje.
              </Text>
            </Section>

            <Text className="text-gray-500 text-xs text-center mt-5">
              <Link
                href="https://github.com/salimi-my/next-auth-starter"
                className="text-gray-500 font-semibold"
              >
                Recursos San Ignacio
              </Link>
              ・ Creado por{' '}
              <Link
                href="https://www.github.com/0-Sandy"
                className="text-gray-500 underline underline-offset-2 px-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Martin
              </Link>
              <Link
                href="#"
                className="text-gray-500 underline underline-offset-2 px-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Máximo
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
