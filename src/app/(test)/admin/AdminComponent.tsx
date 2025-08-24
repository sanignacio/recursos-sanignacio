'use client';

import { toast } from 'sonner';
import { Lock } from 'lucide-react';
import { UserRole } from '@prisma/client';

import { admin } from '@/actions/admin';
import { Button } from '@/components/ui/button';
import { RoleGate } from '@/components/auth/role-gate';
import { FormSuccess } from '@/components/form-success';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function AdminComponent() {
  const onApiRouteClick = () => {
    fetch('/api/admin').then((response) => {
      if (response.ok) {
        toast.success('Ruta API permitida.');
      } else {
        toast.error('Ruta API prohibida.');
      }
    });
  };

  const onServerActionClick = () => {
    admin().then((data) => {
      if (data.error) {
        toast.error(data.error);
      }

      if (data.success) {
        toast.success(data.success);
      }
    });
  };

  return (
    <div className='flex flex-col'>
      <h2 className='text-xl md:text-3xl font-bold tracking-tight pb-4 flex items-center justify-center'>
        <Lock className='mr-2 w-6 md:w-8 h-auto' />
        Administrador
      </h2>
      <Card className='w-full'>
        <CardHeader>
          <h3 className='font-semibold'>Información solo para administradores</h3>
        </CardHeader>
        <CardContent className='space-y-4'>
          <RoleGate allowedRole={UserRole.ADMIN}>
            <FormSuccess message='Si podes ver este contenido.' />
          </RoleGate>
          <div className='flex flex-col space-y-2 md:space-y-0 md:flex-row items-center justify-between rounded-lg border p-2'>
            <p className='text-sm font-medium'>Ruta API solo para administradores</p>
            <Button onClick={onApiRouteClick}>Haga clic para probar</Button>
          </div>

          <div className='flex flex-col space-y-2 md:space-y-0 md:flex-row items-center justify-between rounded-lg border p-2'>
            <p className='text-sm font-medium'>Acción del servidor solo para administradores</p>
            <Button onClick={onServerActionClick}>Haga clic para probar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
