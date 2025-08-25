import { Footer } from "~/components/footer";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex h-full min-h-[calc(100vh-36px-48px)] w-full flex-col items-center justify-center gap-y-10 px-4 py-10">
        {children}
      </div>
      <Footer />
    </>
  );
}
