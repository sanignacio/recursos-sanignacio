'use client'

import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ThemeProvider } from '@/components/theme-provider'

export default function GlobalError() {
  return (
    <html>
      <body className='h-full'>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <main className='bg-background flex h-full min-h-screen items-center justify-center p-4'>
            <CardWrapper
              headerLabel='¡Ups! ¡Algo salió muy mal!'
              footerLabel='Volver al Inicio'
              footerHref='/'
              footerDesc=''
              className='md:w-[600px] p-4'
            >
              <div className='flex w-full flex-col items-center justify-center gap-6'>
                <ExclamationTriangleIcon className='text-destructive h-auto w-16' />

                <p className='text-muted-foreground text-center text-lg md:text-xl'>
                  Ha ocurrido un error inesperado. Puedes intentar recargar la
                  página o regresar al inicio.
                </p>

                <Button variant='default' size='lg' onClick={() => window.location.reload()}>
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
