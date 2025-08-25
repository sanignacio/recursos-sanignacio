'use client'

import { useRouter } from 'next/navigation'

import { SignInForm } from '@/components/auth/sign-in-form'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

interface SignInButtonProps {
  children: React.ReactNode
  mode?: 'modal' | 'redirect'
  asChild?: boolean
}

export function SignInButton({
  children,
  mode = 'redirect',
  asChild,
}: SignInButtonProps) {
  const router = useRouter()

  const onClick = () => {
    router.push('/auth/sign-in')
  }

  if (mode === 'modal') {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className='w-auto border-none bg-transparent p-0'>
          <SignInForm />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Button onClick={onClick} className='cursor-pointer'>
      {children}
    </Button>
  )
}
