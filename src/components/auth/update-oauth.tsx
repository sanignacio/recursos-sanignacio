"use client";

import { useCurrentUser } from "~/hooks/use-current-user";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { changeOAuthAccount } from "~/actions/change-oauth-account";
import { signIn as authSignIn } from "next-auth/react";
import { DEFAULT_SIGNIN_REDIRECT } from "@/routes";

export default function UpdateOauth() {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();

  return (
    user?.isOAuth === true && (
      <Button
        type="button"
        disabled={isPending || !user?.isOAuth}
        className="w-full"
        onClick={() =>
          startTransition(async () => {
            const res = await changeOAuthAccount({ provider: "google" });
            if (res.error) return;
            await authSignIn("google", {
              callbackUrl: DEFAULT_SIGNIN_REDIRECT,
            });
          })
        }
      >
        Cambiar cuenta de Google
      </Button>
    )
  );
}
