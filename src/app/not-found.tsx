'use client'

import { ShieldCheck, Home, ArrowLeft } from 'lucide-react'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className='bg-background flex h-full min-h-screen items-center justify-center p-4'>
      <CardWrapper
        headerLabel=''
        footerLabel='Volver al Inicio'
        footerHref='/'
        footerDesc=''
        className='md:w-[600px] p-4'
      >
        <div className='flex w-full flex-col items-center justify-center gap-6'>
          <div className='space-y-4 text-center'>
            <h1 className='text-6xl leading-none font-bold md:text-7xl lg:text-8xl'>
              404
            </h1>
            <h2 className='text-foreground text-xl font-semibold md:text-2xl lg:text-3xl'>
              Página no encontrada
            </h2>
          </div>

          <p className='text-muted-foreground max-w-lg text-center text-lg md:text-base'>
            Lo sentimos, la página que estás buscando no existe o ha sido movida.
            Verifica la URL o regresa al inicio para encontrar lo que necesitas.
          </p>

          <div className='flex flex-col gap-4 sm:flex-row'>
            <Button
              variant='default'
              size='lg'
              onClick={() => history.back()}
            >
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
