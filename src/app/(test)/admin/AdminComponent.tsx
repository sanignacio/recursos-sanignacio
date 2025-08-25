'use client'

import { UserRole } from '@prisma/client'
import { Lock } from 'lucide-react'
import { toast } from 'sonner'

import { admin } from '@/actions/admin'
import { RoleGate } from '@/components/auth/role-gate'
import { FormSuccess } from '@/components/form-success'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

export default function AdminComponent() {
  const onApiRouteClick = () => {
    fetch('/api/admin').then(response => {
      if (response.ok) {
        toast.success('Ruta API permitida.')
      } else {
        toast.error('Ruta API prohibida.')
      }
    })
  }

  const onServerActionClick = () => {
    admin().then(data => {
      if (data.error) {
        toast.error(data.error)
      }

      if (data.success) {
        toast.success(data.success)
      }
    })
  }

  return (
    <div className='flex flex-col'>
      <h2 className='flex items-center justify-center pb-4 text-xl font-bold tracking-tight md:text-3xl'>
        <Lock className='mr-2 h-auto w-6 md:w-8' />
        Administrador
      </h2>
      <Card className='w-full'>
        <CardHeader>
          <h3 className='font-semibold'>
            Información solo para administradores
          </h3>
        </CardHeader>
        <CardContent className='space-y-4'>
          <RoleGate allowedRole={UserRole.ADMIN}>
            <FormSuccess message='Si podes ver este contenido.' />
          </RoleGate>
          <div className='flex flex-col items-center justify-between space-y-2 rounded-lg border p-2 md:flex-row md:space-y-0'>
            <p className='text-sm font-medium'>
              Ruta API solo para administradores
            </p>
            <Button onClick={onApiRouteClick}>Haga clic para probar</Button>
          </div>

          <div className='flex flex-col items-center justify-between space-y-2 rounded-lg border p-2 md:flex-row md:space-y-0'>
            <p className='text-sm font-medium'>
              Acción del servidor solo para administradores
            </p>
            <Button onClick={onServerActionClick}>Haga clic para probar</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
