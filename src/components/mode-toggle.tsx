'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { MixerVerticalIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                className='bg-background h-8 w-8 rounded-full'
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
          <SunIcon className='dark:text-foreground mr-2 h-4 w-4' />
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem
          className='hover:cursor-pointer'
          onClick={() => setTheme('dark')}
        >
          <MoonIcon className='dark:text-foreground mr-2 h-4 w-4' />
          Oscuro
        </DropdownMenuItem>
        <DropdownMenuItem
          className='hover:cursor-pointer'
          onClick={() => setTheme('system')}
        >
          <MixerVerticalIcon className='dark:text-foreground mr-2 h-4 w-4' />
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
