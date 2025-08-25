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
      <div className="mt-1 mb-6 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-gray-200 after:mt-0.5 after:flex-1 after:border-t after:border-gray-200 dark:before:border-gray-400 dark:after:border-gray-400">
        <p className="text-muted-foreground mx-4 mb-0 text-center font-medium">
          or
        </p>
      </div>
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
