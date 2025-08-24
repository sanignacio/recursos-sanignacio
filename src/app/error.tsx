'use client'

import Link from 'next/link'
import { ShieldCheck, Home, RefreshCw, AlertTriangle } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
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
              Algo salió mal
            </h2>
          </div>

          <p className='text-muted-foreground max-w-2xl text-lg leading-normal md:text-xl'>
            Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado y
            está trabajando para solucionarlo. Puedes intentar recargar la
            página o regresar al inicio.
          </p>

          <div className='mt-8 flex flex-col gap-4 sm:flex-row'>
            <Button variant='default' size='lg' onClick={reset}>
              <RefreshCw className='mr-2 h-4 w-4' />
              Intentar de nuevo
            </Button>

            <Button variant='default' size='lg' asChild>
              <Link href='/'>
                <Home className='mr-2 h-4 w-4' />
                Volver al Inicio
              </Link>
            </Button>
          </div>

          {process.env.NODE_ENV === 'development' && (
            <div className='bg-muted mt-6 max-w-2xl rounded-lg p-4 text-left'>
              <div className='mb-2 flex items-center'>
                <AlertTriangle className='mr-2 h-4 w-4 text-red-500' />
                <span className='text-sm font-semibold text-red-500'>
                  Error de Desarrollo:
                </span>
              </div>
              <p className='text-foreground font-mono text-sm break-all'>
                {error.message}
              </p>
              {error.stack && (
                <details className='mt-2'>
                  <summary className='text-foreground hover:text-primary cursor-pointer text-sm'>
                    Ver stack trace
                  </summary>
                  <pre className='text-foreground mt-2 font-mono text-xs break-all whitespace-pre-wrap'>
                    {error.stack}
                  </pre>
                </details>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
