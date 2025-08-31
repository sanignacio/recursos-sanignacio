import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { SignInButton } from "~/components/auth/sign-in-button";
import { Footer } from "~/components/footer";
import { Button } from "~/components/ui/button";
import { FlipWords } from "~/components/ui/flip-words";

export const dynamic = "force-static";

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
      <main className="flex flex-col items-center justify-start">
        <section className="flex h-[calc(100vh-36px-48px)] w-full flex-col items-center justify-center space-y-6 pt-6 pb-8 md:pt-10 md:pb-12 lg:py-32">
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

        <section className="w-full py-20">
          <div className="container mx-auto max-w-4xl space-y-12 text-center">
            <div>
              <h2 className="mb-4 text-3xl font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
                accusantium!
              </h2>
              <p className="text-muted-foreground leading-relaxed sm:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
                accusantium!
              </h2>
              <p className="text-muted-foreground leading-relaxed sm:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed
                nisi. Nulla quis sem at nibh elementum imperdiet.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
                accusantium!
              </h2>
              <p className="text-muted-foreground leading-relaxed sm:text-lg">
                Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue
                semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
                Class aptent taciti sociosqu ad litora torquent.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-3xl font-bold">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
                accusantium!
              </h2>
              <p className="text-muted-foreground leading-relaxed sm:text-lg">
                Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.
                Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque
                sem at dolor.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
