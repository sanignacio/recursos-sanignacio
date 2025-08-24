import { Footer } from '@/components/footer'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className='flex h-full min-h-[calc(100vh-36px-48px)] items-center justify-center px-4 md:px-0'>
        {children}
      </div>
      <Footer />
    </>
  )
}
