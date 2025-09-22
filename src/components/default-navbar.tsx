"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "~/components/ui/resizable-navbar";
import { useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { SignInButton } from "./auth/sign-in-button";
import Link from "next/link";
import { UserButton } from "./auth/user-button";
import { useSession } from "next-auth/react";

export default function DefaultNavbar() {
  const navItems = [
    {
      name: "Imprimir",
      link: "/print",
    },
    {
      name: "Encargar",
      link: "/order",
    },
    {
      name: "Reservar",
      link: "#",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-4">
          {session?.user ? (
            <NavbarButton
              variant="secondary"
              as="div"
              className="flex items-center justify-center"
            >
              <UserButton />
            </NavbarButton>
          ) : (
            <SignInButton mode="redirect" asChild>
              <NavbarButton variant="secondary">Login</NavbarButton>
            </SignInButton>
          )}

          <NavbarButton
            variant="secondary"
            as="div"
            className="flex items-center justify-center"
          >
            <ModeToggle />
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <Link
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative text-neutral-600 dark:text-neutral-300"
            >
              <span className="block">{item.name}</span>
            </Link>
          ))}
          <div className="flex w-full flex-col gap-4">
            <SignInButton mode="redirect" asChild>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
            </SignInButton>

            <NavbarButton variant="secondary" className="w-full" as="div">
              <UserButton phoneMode />
            </NavbarButton>

            <NavbarButton variant="secondary" className="w-full" as="div">
              <ModeToggle phoneMode />
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
