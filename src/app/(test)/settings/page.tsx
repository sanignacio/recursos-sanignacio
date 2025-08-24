import { UserCog } from 'lucide-react'

import { currentUser } from '@/lib/authentication'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import UpdateProfileForm from '@/components/auth/update-profile-form'
import UpdatePasswordForm from '@/components/auth/update-password-form'

export const metadata = {
  title: 'Configuración',
}

export default async function SettingsPage() {
  const user = await currentUser()

  return (
    <>
      <h2 className='flex items-center justify-center pb-4 text-xl font-bold tracking-tight md:text-3xl'>
        <UserCog className='mr-2 h-auto w-6 md:w-8' />
        Configuración
      </h2>
      <Card className='w-full'>
        <CardHeader>
          <h3 className='font-semibold'>Actualizar perfil</h3>
        </CardHeader>
        <CardContent>
          <UpdateProfileForm />
        </CardContent>
      </Card>
      {user?.isOAuth === false && (
        <Card className='mt-6 w-full'>
          <CardHeader>
            <h3 className='font-semibold'>Actualizar contraseña</h3>
          </CardHeader>
          <CardContent>
            <UpdatePasswordForm />
          </CardContent>
        </Card>
      )}
    </>
  )
}
