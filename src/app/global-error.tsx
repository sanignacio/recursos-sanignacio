'use client'

import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

import { CardWrapper } from '@/components/auth/card-wrapper'
import { ThemeProvider } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'

export default function GlobalError() {
  return (
    <html lang='es'>
      <body className='h-full'>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <main className='flex h-full min-h-screen items-center justify-center bg-background p-4'>
            <CardWrapper
              headerLabel='¡Ups! ¡Algo salió muy mal!'
              footerLabel='Volver al Inicio'
              footerHref='/'
              footerDesc=''
              className='p-4 md:w-[600px]'
            >
              <div className='flex w-full flex-col items-center justify-center gap-6'>
                <ExclamationTriangleIcon className='h-auto w-16 text-destructive' />

                <p className='text-center text-lg text-muted-foreground md:text-xl'>
                  Ha ocurrido un error inesperado. Puedes intentar recargar la
                  página o regresar al inicio.
                </p>

                <Button
                  variant='default'
                  size='lg'
                  onClick={() => window.location.reload()}
                >
                  Recargar
                </Button>
              </div>
            </CardWrapper>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
