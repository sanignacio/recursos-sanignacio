import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

import { CardWrapper } from '@/components/auth/card-wrapper'

export default function ErrorCard() {
  return (
    <CardWrapper
      headerLabel='¡Ups! ¡Algo salió mal!'
      footerLabel='Volver.'
      footerHref='/auth/sign-in'
      footerDesc='Volver al inicio de sesión'
    >
      <div className='flex w-full items-center justify-center'>
        <ExclamationTriangleIcon className='text-destructive h-auto w-16' />
      </div>
    </CardWrapper>
  )
}
