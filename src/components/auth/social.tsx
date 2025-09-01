"use client";

import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { Button } from "~/components/ui/button";
import { DEFAULT_SIGNIN_REDIRECT } from "@/routes";

export function Social() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const onClick = async (provider: "google") => {
    await signIn(provider, {
      callbackUrl: callbackUrl ?? DEFAULT_SIGNIN_REDIRECT,
    });
  };

  return (
    <div className="flex w-full flex-col">
      <div className="my-8 h-[2px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
      <div className="flex w-full flex-col items-center gap-2 md:flex-row">
        <Button
          size="lg"
          className="w-full px-0"
          variant="outline"
          disabled={loadingGoogle}
          onClick={() => {
            setLoadingGoogle(true);
            onClick("google");
          }}
        >
          {loadingGoogle && <Loader2 className="mr-2 animate-spin" size={18} />}
          <FcGoogle className="mr-2 h-5 w-5" />
          <span className="text-xs">Iniciar sesión con Google</span>
        </Button>
      </div>
    </div>
  );
}
