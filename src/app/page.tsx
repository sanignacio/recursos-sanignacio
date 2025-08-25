import { ArrowRightIcon } from '@radix-ui/react-icons'
import { ShieldCheck } from 'lucide-react'
import Link from 'next/link'

import { SignInButton } from '@/components/auth/sign-in-button'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <>
      <main className='flex h-full min-h-[calc(100vh-36px-48px)] flex-col items-center justify-center'>
        <section className='space-y-6 pt-6 pb-8 md:pt-10 md:pb-12 lg:py-32'>
          <div className='container flex max-w-5xl flex-col items-center gap-4 text-center'>
            <Link href='/' className='mb-5 flex items-center'>
              <ShieldCheck
                strokeWidth={2.5}
                className='mr-1 h-auto w-10 md:w-14 lg:w-16'
              />
              <h1 className='text-4xl font-bold md:text-5xl lg:text-6xl'>
                Recursos San Ignacio
              </h1>
            </Link>
            <h1 className='text-3xl font-semibold sm:text-4xl md:text-5xl lg:text-6xl'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
            </h1>
            <p className='max-w-2xl leading-normal text-muted-foreground sm:text-lg sm:leading-8'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
            </p>
            <div className='mt-5 space-x-4'>
              <SignInButton mode='redirect' asChild>
                <Button variant='default' size='lg'>
                  Iniciar Sesión <ArrowRightIcon className='ml-2' />
                </Button>
              </SignInButton>
              <Button variant='secondary' size='lg' asChild>
                <Link
                  href='https://www.sanignacio.edu.uy/'
                  target='_blank'
                  rel='noreferrer'
                >
                  San Ignacio
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
