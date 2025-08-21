import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import { CardWrapper } from '@/components/auth/card-wrapper';

export default function ErrorCard() {
  return (
    <CardWrapper
      headerLabel='¡Ups! ¡Algo salió mal!'
      footerLabel='Volver.'
      footerHref='/auth/sign-in'
      footerDesc='Volver al inicio de sesión'
    >
      <div className='w-full flex justify-center items-center'>
        <ExclamationTriangleIcon className='text-destructive w-16 h-auto' />
      </div>
    </CardWrapper>
  );
}
