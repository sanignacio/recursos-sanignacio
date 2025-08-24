import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

interface FormErrorProps {
  message?: string
}

export function FormError({ message }: FormErrorProps) {
  if (!message) return null

  return (
    <div className='bg-destructive/15 dark:bg-destructive/30 text-destructive flex items-center space-x-2 rounded-md p-3 text-xs md:text-sm dark:text-red-400'>
      <div className='h-4 w-4'>
        <ExclamationTriangleIcon className='h-4 w-4' />
      </div>
      <p>{message}</p>
    </div>
  )
}
