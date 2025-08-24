'use client'

import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <main className='bg-background flex h-full min-h-screen items-center justify-center'>
      <CardWrapper
        headerLabel='¡Ups! ¡Algo salió mal!'
        footerLabel='Volver a Inicio'
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

          <Button variant='default' size='lg' onClick={reset}>
            Recargar
          </Button>

          {process.env.NODE_ENV === 'development' && (
            <div className='bg-muted mt-6 w-full rounded-lg p-4 text-left'>
              <div className='mb-2 flex items-center'>
                <ExclamationTriangleIcon className='mr-2 h-4 w-4 text-red-500/70' />
                <span className='text-sm font-semibold text-red-500/70'>
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
      </CardWrapper>
    </main>
  )
}
