import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

interface AuthHeaderProps {
  label: string;
}

export function Header({ label }: AuthHeaderProps) {
  return (
    <div className='w-full flex flex-col gap-y-3 items-center justify-center'>
      <Link href='/' className='flex items-center'>
        <ShieldCheck strokeWidth={2.5} className='mr-1 w-10 h-auto' />
        <h2 className='text-xl font-bold'>Recursos San Ignacio</h2>
      </Link>
      <p className='text-muted-foreground text-sm'>{label}</p>
    </div>
  );
}
