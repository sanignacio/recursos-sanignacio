'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { updatePassword } from '@/actions/update-password'
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
import { useCurrentUser } from '@/hooks/use-current-user'
import { UpdatePasswordSchema } from '@/schemas'

export default function UpdatePasswordForm() {
  const user = useCurrentUser()
  const { update } = useSession()

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const form = useForm<z.infer<typeof UpdatePasswordSchema>>({
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (values: z.infer<typeof UpdatePasswordSchema>) => {
    startTransition(() => {
      updatePassword(values)
        .then(data => {
          if (data.error) {
            setError(data.error)
          }

          if (data.success) {
            update()
            setSuccess(data.success)
          }
        })
        .catch(() => setError('¡Ups! Algo salió mal.'))
    })
  }

  return (
    <Form {...form}>
      <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-4'>
          {user?.isOAuth === false && (
            <>
              <FormField
                control={form.control}
                name='currentPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña actual</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='••••••••'
                        autoComplete='new-password'
                        type='password'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='newPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nueva contraseña</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='••••••••'
                        type='password'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar nueva contraseña</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='••••••••'
                        type='password'
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button disabled={isPending} type='submit' className='w-full'>
          {isPending && (
            <>
              <Loader2 className='mr-2 animate-spin' size={18} />
              Guardando...
            </>
          )}
          {!isPending && <>Guardar</>}
        </Button>
      </form>
    </Form>
  )
}
