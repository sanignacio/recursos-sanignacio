"use client";

import { Menu, Printer } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { UserButton } from "~/components/auth/user-button";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { cn } from "~/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex h-16 w-full items-center border-b px-4">
      <div className="mr-2 flex w-full items-center justify-end md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href="/server">Servidor</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href="/client">Cliente</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href="/admin">Administrador</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href="/settings">Configuración</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="hidden w-full items-center justify-center space-x-6 md:flex">
        <Link
          href="/server"
          className={cn(
            "hover:text-primary text-sm font-semibold transition-colors",
            pathname !== "/server" && "text-muted-foreground",
          )}
        >
          Servidor
        </Link>
        <Link
          href="/client"
          className={cn(
            "hover:text-primary text-sm font-semibold transition-colors",
            pathname !== "/client" && "text-muted-foreground",
          )}
        >
          Cliente
        </Link>
        <Link
          href="/admin"
          className={cn(
            "hover:text-primary text-sm font-semibold transition-colors",
            pathname !== "/admin" && "text-muted-foreground",
          )}
        >
          Administrador
        </Link>
        <Link
          href="/settings"
          className={cn(
            "hover:text-primary text-sm font-semibold transition-colors",
            pathname !== "/settings" && "text-muted-foreground",
          )}
        >
          Configuración
        </Link>
      </div>
    </nav>
  );
}
