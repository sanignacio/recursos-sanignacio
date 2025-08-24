'use client'

import Link from 'next/link'
import { ShieldCheck, Home, ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function NotFound() {
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
            <h1 className='text-8xl leading-none font-bold md:text-9xl lg:text-[12rem]'>
              404
            </h1>
            <h2 className='text-foreground text-3xl font-semibold md:text-4xl lg:text-5xl'>
              Página no encontrada
            </h2>
          </div>

          <p className='text-muted-foreground max-w-2xl text-lg leading-normal md:text-xl'>
            Lo sentimos, la página que estás buscando no existe o ha sido
            movida. Verifica la URL o regresa al inicio para encontrar lo que
            necesitas.
          </p>

          <div className='mt-8 flex flex-col gap-4 sm:flex-row'>
            <Button
              variant='default'
              size='lg'
              asChild
              onClick={() => history.back()}
            >
              <span className='flex cursor-pointer items-center'>
                <ArrowLeft className='mr-2 h-4 w-4' />
                Regresar a la página anterior
              </span>
            </Button>

            <Button variant='default' size='lg' asChild>
              <Link href='/'>
                <Home className='mr-2 h-4 w-4' />
                Volver al Inicio
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
