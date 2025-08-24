import { Footer } from '@/components/footer'
import { Navbar } from '@/components/protected/navbar'

export default function TestLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className='flex h-full min-h-[calc(100vh_-_36px_-_48px)] w-full flex-col items-center justify-center gap-y-10 px-4 py-10'>
        <div className='bg-background w-full max-w-[600px] overflow-hidden rounded-[0.5rem] border shadow-md md:shadow-xl'>
          <div className='flex flex-col'>
            <Navbar />
            <div className='p-4 md:p-8'>{children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
