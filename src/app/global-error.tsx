"use client"

import './globals.css'
import { ShieldCheck, Home, RefreshCw, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"

export default function GlobalError() {
  return (
    <html>
      <body className="h-full">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="flex h-full min-h-screen flex-col items-center justify-center bg-background">
            <section className="space-y-8 pb-8 pt-6 md:pb-12 md:pt-10">
              <div className="container flex max-w-[64rem] flex-col items-center gap-6 text-center">
                <div className="flex items-center mb-4">
                  <ShieldCheck strokeWidth={2.5} className="mr-2 w-8 md:w-10 lg:w-12 h-auto text-primary" />
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">Recursos San Ignacio</h2>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <AlertTriangle className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 text-destructive" />
                  </div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">Algo salió muy mal</h2>
                </div>

                <p className="max-w-[42rem] leading-normal text-muted-foreground text-lg md:text-xl">
                  Ha ocurrido un error inesperado. Puedes intentar recargar la página o regresar al inicio.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button onClick={() => window.location.reload()} size="lg">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Intentar de nuevo
                  </Button>

                  <Button asChild size="lg">
                    <Link href="/">
                      <Home className="mr-2 h-4 w-4" />
                      Volver al Inicio
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
