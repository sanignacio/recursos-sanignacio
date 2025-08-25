import Link from 'next/link'
import { FaUser } from 'react-icons/fa'

import { SignOutButton } from '@/components/auth/sign-out-button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCurrentUser } from '@/hooks/use-current-user'

export function UserButton() {
  const user = useCurrentUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={user?.image || ''} alt={user?.name || ''} />
            <AvatarFallback>
              <FaUser />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end'>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='truncate text-sm leading-none font-medium'>
              {user?.name}
            </p>
            <p className='truncate text-xs leading-none text-muted-foreground'>
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className='cursor-pointer' asChild>
            <Link href='/server'>Servidor</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer' asChild>
            <Link href='/client'>Cliente</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className='cursor-pointer' asChild>
            <Link href='/settings'>Configuración</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SignOutButton>
          <DropdownMenuItem className='cursor-pointer'>
            Cerrar Sesión
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
