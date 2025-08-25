'use client'

import { ArrowLeft } from 'lucide-react'

import { CardWrapper } from '@/components/auth/card-wrapper'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className='flex h-full min-h-screen items-center justify-center bg-background p-4'>
      <CardWrapper
        headerLabel=''
        footerLabel='Volver al Inicio'
        footerHref='/'
        footerDesc=''
        className='p-4 md:w-[600px]'
      >
        <div className='flex w-full flex-col items-center justify-center gap-6'>
          <div className='space-y-4 text-center'>
            <h1 className='text-6xl leading-none font-bold md:text-7xl lg:text-8xl'>
              404
            </h1>
            <h2 className='text-xl font-semibold text-foreground md:text-2xl lg:text-3xl'>
              Página no encontrada
            </h2>
          </div>

          <p className='max-w-lg text-center text-lg text-muted-foreground md:text-base'>
            Lo sentimos, la página que estás buscando no existe o ha sido
            movida. Verifica la URL o regresa al inicio para encontrar lo que
            necesitas.
          </p>

          <div className='flex flex-col gap-4 sm:flex-row'>
            <Button variant='default' size='lg' onClick={() => history.back()}>
              <span className='flex items-center'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Regresar a la página anterior
              </span>
            </Button>
          </div>
        </div>
      </CardWrapper>
    </main>
  )
}
