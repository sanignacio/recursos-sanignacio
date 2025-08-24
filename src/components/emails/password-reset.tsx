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

interface PasswordResetProps {
  name: string | null
  resetLink: string
}

export function PasswordReset({ name, resetLink }: PasswordResetProps) {
  return (
    <Html>
      <Head>
        <title>Restablecer contraseña</title>
      </Head>
      <Preview>
        Restablecer la contraseña de su cuenta de Recursos San Ignacio
      </Preview>
      <Tailwind>
        <Body className='bg-white font-sans text-gray-900'>
          <Container className='mx-auto my-0 max-w-[480px] px-0 pt-5 pb-12'>
            <Link href={baseUrl} className='flex items-center text-gray-800'>
              <Img
                src={`${baseUrl}/shield-check.png`}
                width='32'
                height='32'
                className='mr-1 -ml-1'
                alt='Auth'
              />
              <Heading as='h1' className='m-0 text-3xl font-bold'>
                Auth
              </Heading>
            </Link>

            <Text className='text-xl'>
              Hola <strong>{typeof name === 'string' ? name : 'User'}</strong>,
              tu cuenta ha solicitado un cambio de contraseña.
            </Text>

            <Section className='rounded-md border border-solid border-gray-300 p-6 text-center'>
              <Text className='m-0 mb-3 text-left'>
                ¡Saludos de <strong>Recursos San Ignacio</strong>!
              </Text>
              <Text className='m-0 mb-3 text-left'>
                Alguien recientemente solicitó un cambio de contraseña para su
                cuenta de Recursos San Ignacio. Si fue usted, haga clic en el
                botón de abajo para establecer una nueva contraseña.
              </Text>

              <Button
                href={resetLink}
                className='rounded-md bg-gray-900 px-6 py-2 text-sm font-semibold text-white'
              >
                Restablecer contraseña
              </Button>

              <Text className='m-0 my-3 text-left'>
                Si no desea cambiar su contraseña o no lo solicitó, simplemente
                ignore y elimine este mensaje.
              </Text>
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
