"use client"

import Link from "next/link"
import { ShieldCheck, Home, RefreshCw, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">Algo salió mal</h2>
          </div>

          <p className="max-w-[42rem] leading-normal text-muted-foreground text-lg md:text-xl">
            Ha ocurrido un error inesperado. Nuestro equipo ha sido notificado y está trabajando para solucionarlo.
            Puedes intentar recargar la página o regresar al inicio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button variant="default" size="lg" onClick={reset}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Intentar de nuevo
            </Button>

            <Button variant="default" size="lg" asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Volver al Inicio
              </Link>
            </Button>
          </div>

          {process.env.NODE_ENV === "development" && (
            <div className="max-w-[42rem] p-4 bg-muted rounded-lg text-left mt-6">
              <div className="flex items-center mb-2">
                <AlertTriangle className="w-4 h-4 text-red-500 mr-2" />
                <span className="text-sm font-semibold text-red-500">Error de Desarrollo:</span>
              </div>
              <p className="text-sm text-foreground font-mono break-all">{error.message}</p>
              {error.stack && (
                <details className="mt-2">
                  <summary className="text-sm text-foreground cursor-pointer hover:text-primary">
                    Ver stack trace
                  </summary>
                  <pre className="text-xs text-foreground font-mono mt-2 whitespace-pre-wrap break-all">
                    {error.stack}
                  </pre>
                </details>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
