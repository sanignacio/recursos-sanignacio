'use client'

import { MixerVerticalIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                className='h-8 w-8 rounded-full bg-background'
                variant='outline'
                size='icon'
              >
                <SunIcon className='h-5 w-5 scale-100 rotate-0 transition-transform duration-500 ease-in-out dark:scale-0 dark:-rotate-90' />
                <MoonIcon className='absolute h-5 w-5 scale-0 rotate-90 transition-transform duration-500 ease-in-out dark:scale-100 dark:rotate-0' />
                <span className='sr-only'>Cambiar tema</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side='bottom'>Cambiar tema</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          className='hover:cursor-pointer'
          onClick={() => setTheme('light')}
        >
          <SunIcon className='mr-2 h-4 w-4 dark:text-foreground' />
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem
          className='hover:cursor-pointer'
          onClick={() => setTheme('dark')}
        >
          <MoonIcon className='mr-2 h-4 w-4 dark:text-foreground' />
          Oscuro
        </DropdownMenuItem>
        <DropdownMenuItem
          className='hover:cursor-pointer'
          onClick={() => setTheme('system')}
        >
          <MixerVerticalIcon className='mr-2 h-4 w-4 dark:text-foreground' />
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
