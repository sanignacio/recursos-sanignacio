import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { SignInButton } from "~/components/auth/sign-in-button";
import { Footer } from "~/components/footer";
import { Button } from "~/components/ui/button";
import { FlipWords } from "~/components/ui/flip-words";

export default function HomePage() {
  const words = [
    "imprime",
    "encarga",
    "organiza",
    "solicita",
    "gestiona",
    "reserva",
    "coordina",
    "envía",
  ];

  return (
    <>
      <main className="flex h-full min-h-[calc(100vh-36px-48px)] flex-col items-center justify-center">
        <section className="space-y-6 pt-6 pb-8 md:pt-10 md:pb-12 lg:py-32">
          <div className="container flex max-w-5xl flex-col items-center gap-4 text-center">
            <div className="mb-5 text-5xl font-bold md:text-6xl lg:text-7xl">
              San Ignacio <FlipWords words={words} />
            </div>
            <h1 className="text-xl font-semibold sm:text-xl md:text-2xl lg:text-3xl">
              Con Recursos San Ignacio es mas fácil
            </h1>
            <p className="text-muted-foreground max-w-2xl leading-normal sm:text-lg sm:leading-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <div className="mt-5 space-x-4">
              <SignInButton mode="redirect" asChild>
                <Button variant="default" size="lg">
                  Iniciar Sesión <ArrowRightIcon className="ml-2" />
                </Button>
              </SignInButton>
              <Button variant="secondary" size="lg" asChild>
                <Link
                  href="https://www.sanignacio.edu.uy/"
                  target="_blank"
                  rel="noreferrer"
                >
                  San Ignacio
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
