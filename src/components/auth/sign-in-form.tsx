'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { signIn } from '@/actions/sign-in'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SignInSchema } from '@/schemas'

export function SignInForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider.'
      : ''

  const [isPending, startTransition] = useTransition()
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof SignInSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      signIn(values, callbackUrl)
        .then(data => {
          if (data?.error) {
            form.reset()
            setError(data.error)
          }

          if (data?.success) {
            form.reset()
            setSuccess(typeof data.success === 'string' ? data.success : '')
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true)
          }
        })
        .catch(() => setError('¡Ups! Algo salió mal.'))
    })
  }

  return (
    <CardWrapper
      headerLabel='Inicia sesión en tu cuenta'
      footerLabel='Regístrate'
      footerHref='/auth/sign-up'
      footerDesc='¿Aún no tienes una cuenta?'
      showSocial={!showTwoFactor}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          <div className='space-y-4'>
            {/* Display form for 2FA */}
            {showTwoFactor && (
              <FormField
                control={form.control}
                name='code'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Código de autenticación de dos factores
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='123456'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Display form for no 2FA */}
            {!showTwoFactor && (
              <>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo electrónico</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder='name@domain.com'
                          type='email'
                          autoComplete='email'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder='••••••••'
                          type='password'
                        />
                      </FormControl>
                      <FormMessage />
                      <Button
                        disabled={isPending}
                        size='sm'
                        variant='link'
                        asChild
                        className='px-0 font-normal'
                      >
                        <Link href='/auth/forgot-password'>
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </Button>
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type='submit' className='w-full'>
            {isPending && (
              <>
                <Loader2 className='mr-2 animate-spin' size={18} />
                {showTwoFactor ? 'Confirming...' : 'Signing in...'}
              </>
            )}
            {!isPending && <>{showTwoFactor ? 'Confirm' : 'Sign in'}</>}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
