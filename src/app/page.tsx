import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { ArrowRightIcon } from '@radix-ui/react-icons';

import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { SignInButton } from '@/components/auth/sign-in-button';

export default function HomePage() {  
  return (
    <>
      <main className='flex h-full min-h-[calc(100vh_-_36px_-_48px)] flex-col items-center justify-center'>
        <section className='space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32'>
          <div className='container flex max-w-[64rem] flex-col items-center gap-4 text-center'>
            <Link href='/' className='flex items-center mb-5'>
              <ShieldCheck
                strokeWidth={2.5}
                className='mr-1 w-10 md:w-14 lg:w-16 h-auto'
              />
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold'>
                Recursos San Ignacio
              </h1>
            </Link>
            <h1 className='font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
            </h1>
            <p className='max-w-[42rem] leading-normal text-muted-foreground sm:text-lg sm:leading-8'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
            </p>
            <div className='space-x-4 mt-5'>
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
  );
}
