'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { UserRole } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { signUp } from '@/actions/sign-up'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { SignUpSchema } from '@/schemas'

export function SignUpForm() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')

  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirm: '',
      name: '',
      role: 'STUDENT',
    },
  })

  const onSubmit = (values: z.infer<typeof SignUpSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      signUp(values).then(data => {
        setError(data.error)
        setSuccess(data.success)
      })
    })
  }

  return (
    <CardWrapper
      headerLabel='Crear una cuenta'
      footerLabel='Iniciar sesión'
      footerHref='/auth/sign-in'
      footerDesc='¿Ya tenes una cuenta?'
      showSocial
    >
      <FormSuccess message={success} />
      {!success && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='Tu nombre'
                        type='text'
                        autoComplete='name'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirm'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='••••••••'
                        type='password'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Seleccionar rol' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={UserRole.STUDENT}>
                            Alumno
                          </SelectItem>
                          <SelectItem value={UserRole.TEACHER}>
                            Profesor
                          </SelectItem>
                          <SelectItem value={UserRole.ADMIN}>
                            Administrador
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <Button disabled={isPending} type='submit' className='w-full'>
              {isPending && (
                <>
                  <Loader2 className='mr-2 animate-spin' size={18} />
                  Creando...
                </>
              )}
              {!isPending && <>Crear una cuenta</>}
            </Button>
          </form>
        </Form>
      )}
    </CardWrapper>
  )
}
