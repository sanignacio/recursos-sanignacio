import { Footer } from '@/components/footer';

export default function ProtectedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='h-full min-h-[calc(100vh_-_36px_-_48px)] py-10 px-4 w-full flex flex-col gap-y-10 items-center justify-center'>
        {children}
      </div>
      <Footer />
    </>
  );
}
