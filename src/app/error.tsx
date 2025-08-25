'use client'

import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

import { CardWrapper } from '@/components/auth/card-wrapper'
import { Button } from '@/components/ui/button'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className='flex h-full min-h-screen items-center justify-center bg-background'>
      <CardWrapper
        headerLabel='¡Ups! ¡Algo salió mal!'
        footerLabel='Volver a Inicio'
        footerHref='/'
        footerDesc=''
        className='p-4 md:w-[600px]'
      >
        <div className='flex w-full flex-col items-center justify-center gap-6'>
          <ExclamationTriangleIcon className='h-auto w-16 text-destructive' />

          <p className='text-center text-lg text-muted-foreground md:text-xl'>
            Ha ocurrido un error inesperado. Puedes intentar recargar la página
            o regresar al inicio.
          </p>

          <Button variant='default' size='lg' onClick={reset}>
            Recargar
          </Button>

          {process.env.NODE_ENV === 'development' && (
            <div className='mt-6 w-full rounded-lg bg-muted p-4 text-left'>
              <div className='mb-2 flex items-center'>
                <ExclamationTriangleIcon className='mr-2 h-4 w-4 text-red-500/70' />
                <span className='text-sm font-semibold text-red-500/70'>
                  Error de Desarrollo:
                </span>
              </div>
              <p className='font-mono text-sm break-all text-foreground'>
                {error.message}
              </p>
              {error.stack && (
                <details className='mt-2'>
                  <summary className='cursor-pointer text-sm text-foreground hover:text-primary'>
                    Ver stack trace
                  </summary>
                  <pre className='mt-2 font-mono text-xs break-all whitespace-pre-wrap text-foreground'>
                    {error.stack}
                  </pre>
                </details>
              )}
            </div>
          )}
        </div>
      </CardWrapper>
    </main>
  )
}
