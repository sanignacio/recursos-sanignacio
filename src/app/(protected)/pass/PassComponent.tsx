"use client";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { useCurrentUser } from "~/hooks/use-current-user";

export default function PassComponent() {
  const user = useCurrentUser();

  return (
    <div className="flex flex-col gap-4">
      Pass Page, passes: {user?.passes}
      <Button>
        <Link href="/pass/buy">Comprar más cuponeras</Link>
      </Button>
    </div>
  );
}
