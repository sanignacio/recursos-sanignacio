"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";

import { emailVerification } from "~/actions/email-verification";
import { CardWrapper } from "~/components/auth/card-wrapper";
import { FormError } from "~/components/form-error";
import { FormSuccess } from "~/components/form-success";

export function EmailVerificationForm() {
  const submit = useRef(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) {
      return;
    }

    if (!token) {
      setError("Falta el token.");
      return;
    }

    emailVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Algo salió mal.");
      });
  }, [token, success, error]);

  useEffect(() => {
    if (!submit.current) {
      submit.current = true;
      onSubmit();
    }
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Verificando su correo electrónico"
      footerLabel="Iniciar sesión"
      footerHref="/auth/sign-in"
      footerDesc="Volver."
    >
      <div className="flex w-full items-center justify-center">
        {!success && !error && <BeatLoader />}
        {!!success && <FormSuccess message={success} />}
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
}
