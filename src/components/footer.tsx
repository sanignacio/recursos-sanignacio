import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Footer() {
  return (
    <footer className="flex justify-center">
      <small className="text-muted-foreground">
        Creado por{' '}
        <span className="space-x-2">
          <Button variant="link" className="text-xs px-1" asChild>
            <Link
              href="https://www.github.com/0-Sandy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Martin
            </Link>
          </Button>
          <Button variant="link" className="text-xs px-1" asChild>
            <Link href="#" target="_blank" rel="noopener noreferrer">
              Máximo
            </Link>
          </Button>
        </span>
        &copy; {new Date().getFullYear()}.
      </small>
    </footer>
  )
}
