import { LucideIcon } from 'lucide-react'

import { ExtendedUser } from '&/next-auth'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface UserInfoProps {
  user?: ExtendedUser
  label: string
  icon: LucideIcon
}

export function UserInfo({ user, label, icon: Icon }: UserInfoProps) {
  return (
    <div className='flex flex-col'>
      <h2 className='flex items-center justify-center pb-4 text-xl font-bold tracking-tight md:text-3xl'>
        <Icon className='mr-2 h-auto w-6 md:w-8' />
        {label}
      </h2>
      <Card className='w-full'>
        <CardHeader>
          <h3 className='font-semibold'>Información del usuario</h3>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex flex-row items-center justify-between rounded-md border px-3 py-1.5'>
            <p className='text-sm font-medium'>ID</p>
            <p className='max-w-[200px] truncate rounded-sm bg-zinc-100 px-2 font-mono text-xs dark:bg-zinc-700'>
              {user?.id}
            </p>
          </div>
          <div className='flex flex-row items-center justify-between rounded-md border px-3 py-1.5'>
            <p className='text-sm font-medium'>Nombre</p>
            <p className='max-w-[200px] truncate rounded-sm bg-zinc-100 px-2 font-mono text-xs dark:bg-zinc-700'>
              {user?.name}
            </p>
          </div>
          <div className='flex flex-row items-center justify-between rounded-md border px-3 py-1.5'>
            <p className='text-sm font-medium'>Correo Electrónico</p>
            <p className='max-w-[200px] truncate rounded-sm bg-zinc-100 px-2 font-mono text-xs dark:bg-zinc-700'>
              {user?.email}
            </p>
          </div>
          <div className='flex flex-row items-center justify-between rounded-md border px-3 py-1.5'>
            <p className='text-sm font-medium'>Rol</p>
            <p className='max-w-[200px] truncate rounded-sm bg-zinc-100 px-2 font-mono text-xs dark:bg-zinc-700'>
              {user?.role}
            </p>
          </div>

          <div className='flex flex-row items-center justify-between rounded-md border px-3 py-1.5'>
            <p className='text-sm font-medium'>Autenticación de dos factores</p>
            <Badge
              variant={user?.isTwoFactorEnabled ? 'success' : 'destructive'}
            >
              {user?.isTwoFactorEnabled ? 'Activado' : 'Desactivado'}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
