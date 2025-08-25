import React from 'react'

import { AuthFooter } from '@/components/auth/auth-footer'
import { Header } from '@/components/auth/header'
import { Social } from '@/components/auth/social'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface CardWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  headerLabel: string
  footerLabel: string
  footerHref: string
  footerDesc: string
  showSocial?: boolean
}

export const CardWrapper = React.forwardRef<HTMLDivElement, CardWrapperProps>(
  (
    {
      children,
      headerLabel,
      footerLabel,
      footerHref,
      footerDesc,
      showSocial,
      className,
      ...rest
    },
    ref,
  ) => {
    return (
      <Card
        ref={ref}
        className={cn('w-full shadow-md md:w-[450px]', className)}
        {...rest}
      >
        <CardHeader>
          <Header label={headerLabel} />
        </CardHeader>
        <CardContent>{children}</CardContent>
        {showSocial && (
          <CardFooter>
            <Social />
          </CardFooter>
        )}
        <CardFooter className='justify-center'>
          <AuthFooter
            label={footerLabel}
            href={footerHref}
            description={footerDesc}
          />
        </CardFooter>
      </Card>
    )
  },
)
CardWrapper.displayName = 'CardWrapper'
