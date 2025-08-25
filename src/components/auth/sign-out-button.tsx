'use client'

import { signOut } from '@/actions/sign-out'
import { Button } from '@/components/ui/button'

interface SignOutButtonProps {
  children?: React.ReactNode
}

export function SignOutButton({ children }: SignOutButtonProps) {
  return (
    <Button onClick={() => signOut()} className='cursor-pointer'>
      {children}
    </Button>
  )
}
