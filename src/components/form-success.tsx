import { CheckCircledIcon } from '@radix-ui/react-icons'

interface FormSuccessProps {
  message?: string
}

export function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null

  return (
    <div className='flex items-center space-x-2 rounded-md bg-emerald-500/15 p-3 text-xs text-emerald-500 md:text-sm dark:bg-emerald-500/30 dark:text-emerald-300'>
      <div className='h-4 w-4'>
        <CheckCircledIcon className='h-4 w-4' />
      </div>
      <p>{message}</p>
    </div>
  )
}
