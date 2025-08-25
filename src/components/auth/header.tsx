import { ShieldCheck } from 'lucide-react'
import Link from 'next/link'

interface AuthHeaderProps {
  label: string
}

export function Header({ label }: AuthHeaderProps) {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-y-3'>
      <Link href='/' className='flex items-center'>
        <ShieldCheck strokeWidth={2.5} className='mr-1 h-auto w-10' />
        <h2 className='text-xl font-bold'>Recursos San Ignacio</h2>
      </Link>
      <p className='text-sm text-muted-foreground'>{label}</p>
    </div>
  )
}
