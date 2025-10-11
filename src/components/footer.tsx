import Link from "next/link";

import { Button } from "~/components/ui/button";

export function Footer() {
  return (
    <footer className="flex justify-center">
      <small className="text-muted-foreground text-center">
        Creado por{" "}
        <span>
          <Button variant="link" className="px-0 pr-1 text-xs" asChild>
            <Link
              href="https://github.com/sanignacio"
              target="_blank"
              rel="noopener noreferrer"
            >
              Maflux Studios
            </Link>
          </Button>
          y
          <Button variant="link" className="px-1 text-xs" asChild>
            <Link
              href="https://www.sanignacio.edu.uy"
              target="_blank"
              rel="noopener noreferrer"
            >
              San Ignacio
            </Link>
          </Button>
        </span>
        &copy; {new Date().getFullYear()}. {"  •  "}
        <Button variant="link" className="px-1 text-xs" asChild>
          <Link href="/policies/terms">Términos y Condiciones de Uso</Link>
        </Button>
        {"  •  "}
        <Button variant="link" className="px-1 text-xs" asChild>
          <Link href="/policies/privacy">Política de Privacidad</Link>
        </Button>
      </small>
    </footer>
  );
}
