import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

import './globals.css'
import { auth } from '&/auth'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'
import { ModeToggle } from '@/components/mode-toggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.AUTH_URL
      ? `${process.env.AUTH_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : `http://localhost:${process.env.PORT || 3000}`,
  ),
  title: {
    default: 'Recursos San Ignacio',
    template: '%s | Recursos San Ignacio',
  },
  description: 'Aca podes encargar cosas a recursos del liceo San Ignacio.',
  openGraph: {
    url: '/',
    title: 'Recursos San Ignacio',
    description: 'Aca podes encargar cosas a recursos del liceo San Ignacio.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recursos San Ignacio',
    description: 'Aca podes encargar cosas a recursos del liceo San Ignacio.',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <html lang='es' suppressHydrationWarning>
        <body
          className={cn('relative', inter.className)}
          suppressHydrationWarning
        >
          <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
            <div className='flex w-full justify-end pt-4 pr-4'>
              <ModeToggle />
            </div>
            {children}
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  )
}
