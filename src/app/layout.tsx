import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import { cn } from "~/lib/utils";
import { auth } from "~/server/auth";
import DefaultNavbar from "~/components/default-navbar";

const font = localFont({ src: "../../public/avenir-lt-std.woff2" });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.AUTH_URL
      ? `${process.env.AUTH_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : `http://localhost:${process.env.PORT ?? 3000}`,
  ),
  title: {
    default: "Recursos San Ignacio",
    template: "%s | Recursos San Ignacio",
  },
  description: "Aca podes encargar cosas a recursos del liceo San Ignacio.",
  openGraph: {
    url: "/",
    title: "Recursos San Ignacio",
    description: "Aca podes encargar cosas a recursos del liceo San Ignacio.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Recursos San Ignacio",
    description: "Aca podes encargar cosas a recursos del liceo San Ignacio.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body className={cn("relative w-full", font.className)}>
        <SessionProvider session={session ?? undefined}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <DefaultNavbar />
            {children}
          </ThemeProvider>
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
