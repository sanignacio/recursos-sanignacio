'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { UserRole } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { cancelNewEmail } from '@/actions/cancel-new-email'
import { updateProfile } from '@/actions/update-profile'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
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
import { Switch } from '@/components/ui/switch'
import { useCurrentUser } from '@/hooks/use-current-user'
import { UpdateProfileSchema } from '@/schemas'

export default function UpdateProfileForm() {
  const user = useCurrentUser()
  const { update } = useSession()

  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | undefined>()
  const [success, setSuccess] = useState<string | undefined>()

  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.tempEmail ? user.tempEmail : user?.email ? user.email : '',
      role: user?.role || 'STUDENT',
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
    },
  })

  const onSubmit = (values: z.infer<typeof UpdateProfileSchema>) => {
    startTransition(() => {
      updateProfile(values)
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

  const onCancelEmailUpdate = () => {
    startTransition(() => {
      cancelNewEmail()
        .then(data => {
          if (data.error) {
            setError(data.error)
          }

          if (data.success) {
            update()
            setSuccess(data.success)
          }

          form.reset()
        })
        .catch(() => setError('¡Ups! Algo salió mal.'))
    })
  }

  return (
    <Form {...form}>
      <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='John Doe'
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {user?.isOAuth === false && (
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <div className='flex gap-2'>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='name@domain.com'
                        disabled={isPending || !!user.tempEmail}
                      />
                    </FormControl>
                    {!!user.tempEmail && (
                      <Button
                        type='button'
                        onClick={onCancelEmailUpdate}
                        disabled={isPending}
                      >
                        Cancelar
                      </Button>
                    )}
                  </div>
                  {!!user.tempEmail && (
                    <FormDescription>
                      Verifique su nueva dirección de correo electrónico o
                      cancele el uso de la dirección anterior.
                    </FormDescription>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <Select
                  disabled={isPending}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Elegí un rol' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={UserRole.ADMIN}>
                      Administrador
                    </SelectItem>
                    <SelectItem value={UserRole.TEACHER}>Profesor</SelectItem>
                    <SelectItem value={UserRole.STUDENT}>Alumno</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {user?.isOAuth === false && (
            <FormField
              control={form.control}
              name='isTwoFactorEnabled'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-xs'>
                  <div className='space-y-0.5'>
                    <FormLabel>Autenticación de dos factores</FormLabel>
                    <FormDescription>
                      Habilitar la autenticación de dos factores para su cuenta
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      disabled={isPending}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
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
