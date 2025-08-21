import { Footer } from '@/components/footer';

export default function ProtectedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
