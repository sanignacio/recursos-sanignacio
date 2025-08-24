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
  Text,
} from '@react-email/components'

const baseUrl = process.env.AUTH_URL

interface EmailVerificationProps {
  name: string | null
  verifyLink: string
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
        <Body className='bg-white font-sans text-gray-900'>
          <Container className='mx-auto my-0 max-w-[480px] px-0 pt-5 pb-12'>
            <Link href={baseUrl} className='flex items-center text-gray-800'>
              <Img
                src={`${baseUrl}/shield-check.png`}
                width='32'
                height='32'
                alt='Auth'
                className='mr-1 -ml-1'
              />
              <Heading as='h1' className='m-0 text-3xl font-bold'>
                Auth
              </Heading>
            </Link>

            <Text className='text-xl'>
              Hola <strong>{typeof name === 'string' ? name : 'User'}</strong>,
              hay una cuenta registrada con su correo electrónico.
            </Text>

            <Section className='rounded-md border border-solid border-gray-300 p-6 text-center'>
              <Text className='m-0 mb-3 text-left'>
                ¡Saludos de <strong>Recursos San Ignacio</strong>!
              </Text>
              <Text className='m-0 mb-3 text-left'>
                Se registró una cuenta de Recursos San Ignacio con tu dirección
                de correo electrónico. Queremos asegurarnos de que seas tú. Haz
                clic en el botón de abajo para verificar tu dirección de correo
                electrónico.
              </Text>

              <Button
                href={verifyLink}
                className='rounded-md bg-gray-900 px-6 py-2 text-sm font-semibold text-white'
              >
                Verificar
              </Button>
            </Section>

            <Text className='mt-5 text-center text-xs text-gray-500'>
              <Link
                href='https://github.com/salimi-my/next-auth-starter'
                className='font-semibold text-gray-500'
              >
                Recursos San Ignacio
              </Link>
              ・ Creado por{' '}
              <Link
                href='https://www.github.com/0-Sandy'
                className='px-1 text-gray-500 underline underline-offset-2'
                target='_blank'
                rel='noopener noreferrer'
              >
                Martin
              </Link>
              <Link
                href='#'
                className='px-1 text-gray-500 underline underline-offset-2'
                target='_blank'
                rel='noopener noreferrer'
              >
                Máximo
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
