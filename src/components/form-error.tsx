import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

interface FormErrorProps {
  message?: string
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null

  return (
    <div className='flex items-center space-x-2 rounded-md bg-destructive/15 p-3 text-xs text-destructive md:text-sm dark:bg-destructive/30 dark:text-red-400'>
      <div className='h-4 w-4'>
        <ExclamationTriangleIcon className='h-4 w-4' />
      </div>
      <p>{message}</p>
    </div>
  )
}
