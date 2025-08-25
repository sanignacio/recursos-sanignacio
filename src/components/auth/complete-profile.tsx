"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "@prisma/client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";
import { completeProfile } from "~/actions/complete-profile";

import { CardWrapper } from "~/components/auth/card-wrapper";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { CompleteProfileSchema } from "~/schemas";
import { FormError } from "../form-error";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { DEFAULT_SIGNIN_REDIRECT } from "@/routes";

export function CompleteProfileForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const { update } = useSession();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();

  const form = useForm<z.infer<typeof CompleteProfileSchema>>({
    resolver: zodResolver(CompleteProfileSchema),
    defaultValues: {
      role: UserRole.STUDENT,
    },
  });

  const onSubmit = (values: z.infer<typeof CompleteProfileSchema>) => {
    startTransition(async () => {
      await completeProfile(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }

          if (data.success) {
            update();
            const redirectTo = callbackUrl ?? DEFAULT_SIGNIN_REDIRECT;
            window.location.href = redirectTo;
          }
        })
        .catch(() => setError("¡Ups! Algo salió mal."));
    });
  };

  return (
    <CardWrapper
      headerLabel="Completa tu perfil"
      footerLabel=""
      footerHref=""
      footerDesc=""
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <FormControl>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={UserRole.STUDENT}>Alumno</SelectItem>
                      <SelectItem value={UserRole.TEACHER}>Profesor</SelectItem>
                      <SelectItem value={UserRole.ADMIN}>
                        Administrador
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? "Guardando..." : "Guardar rol"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
