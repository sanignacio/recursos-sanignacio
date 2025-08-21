'use client';

import * as z from 'zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { UserRole } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { UpdateProfileSchema } from '@/schemas';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { updateProfile } from '@/actions/update-profile';
import { useCurrentUser } from '@/hooks/use-current-user';
import { cancelNewEmail } from '@/actions/cancel-new-email';

export default function UpdateProfileForm() {
  const user = useCurrentUser();
  const { update } = useSession();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof UpdateProfileSchema>>({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.tempEmail ? user.tempEmail : user?.email ? user.email : '',
      role: user?.role || 'USER',
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false
    }
  });

  const onSubmit = (values: z.infer<typeof UpdateProfileSchema>) => {
    startTransition(() => {
      updateProfile(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            update();
            setSuccess(data.success);
          }
        })
        .catch(() => setError('¡Ups! Algo salió mal.'));
    });
  };

  const onCancelEmailUpdate = () => {
    startTransition(() => {
      cancelNewEmail()
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            update();
            setSuccess(data.success);
          }

          form.reset();
        })
        .catch(() => setError('¡Ups! Algo salió mal.'));
    });
  };

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
                      Verifique su nueva dirección de correo electrónico o cancele
                      el uso de la dirección anterior.
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
                      <SelectValue placeholder='Select role' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                    <SelectItem value={UserRole.USER}>User</SelectItem>
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
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
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
              <Loader2 className='animate-spin mr-2' size={18} />
              Guardando...
            </>
          )}
          {!isPending && <>Guardando</>}
        </Button>
      </form>
    </Form>
  );
}
