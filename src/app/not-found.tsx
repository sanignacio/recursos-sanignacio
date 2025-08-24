"use client";

import Link from "next/link"
import { ShieldCheck, Home, Search, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <main className="flex h-full min-h-screen flex-col items-center justify-center bg-background">
      <section className="space-y-8 pb-8 pt-6 md:pb-12 md:pt-10">
        <div className="container flex max-w-[64rem] flex-col items-center gap-6 text-center">
          <div className="flex items-center mb-4">
            <ShieldCheck strokeWidth={2.5} className="mr-2 w-8 md:w-10 lg:w-12 h-auto text-primary" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">Recursos San Ignacio</h2>
          </div>

          <div className="space-y-4">
            <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-bold leading-none">404</h1>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">Página no encontrada</h2>
          </div>

          <p className="max-w-[42rem] leading-normal text-muted-foreground text-lg md:text-xl">
            Lo sentimos, la página que estás buscando no existe o ha sido movida. Verifica la URL o regresa al inicio
            para encontrar lo que necesitas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button variant="default" size="lg" asChild onClick={() => history.back()}>
              <span className="cursor-pointer flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Regresar a la página anterior
              </span>
            </Button>

            <Button variant="default" size="lg" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Volver al Inicio
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
