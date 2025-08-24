'use client'

import './globals.css'
import { ShieldCheck, Home, RefreshCw, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeProvider } from '@/components/theme-provider'

export default function GlobalError() {
  return (
    <html>
      <body className='h-full'>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <main className='bg-background flex h-full min-h-screen flex-col items-center justify-center'>
            <section className='space-y-8 pt-6 pb-8 md:pt-10 md:pb-12'>
              <div className='container flex max-w-5xl flex-col items-center gap-6 text-center'>
                <div className='mb-4 flex items-center'>
                  <ShieldCheck
                    strokeWidth={2.5}
                    className='text-primary mr-2 h-auto w-8 md:w-10 lg:w-12'
                  />
                  <h2 className='text-foreground text-2xl font-bold md:text-3xl lg:text-4xl'>
                    Recursos San Ignacio
                  </h2>
                </div>

                <div className='space-y-4'>
                  <div className='flex items-center justify-center'>
                    <AlertTriangle className='text-destructive h-20 w-20 md:h-24 md:w-24 lg:h-28 lg:w-28' />
                  </div>
                  <h2 className='text-foreground text-3xl font-semibold md:text-4xl lg:text-5xl'>
                    Algo salió muy mal
                  </h2>
                </div>

                <p className='text-muted-foreground max-w-2xl text-lg leading-normal md:text-xl'>
                  Ha ocurrido un error inesperado. Puedes intentar recargar la
                  página o regresar al inicio.
                </p>

                <div className='mt-8 flex flex-col gap-4 sm:flex-row'>
                  <Button onClick={() => window.location.reload()} size='lg'>
                    <RefreshCw className='mr-2 h-4 w-4' />
                    Intentar de nuevo
                  </Button>

                  <Button asChild size='lg'>
                    <Link href='/'>
                      <Home className='mr-2 h-4 w-4' />
                      Volver al Inicio
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
