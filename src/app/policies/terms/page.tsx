import React from "react";

type Props = {
  className?: string;
};

const lastUpdated = "9 de octubre de 2025";
const adminContact = "legal@recursos-sanignacio.example";

export default function TermsAndConditions({ className = "" }: Props) {
  return (
    <main
      className={`mx-auto max-w-2xl space-y-10 p-6 text-sm sm:p-8 sm:text-[15px] lg:p-10 ${className}`}
      aria-labelledby="terms-title"
    >
      <header className="space-y-1 text-center">
        <h1
          id="terms-title"
          className="text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Términos y Condiciones de Uso — Recursos San Ignacio
        </h1>
        <p className="text-muted-foreground">
          Última actualización: <time dateTime="2025-10-09">{lastUpdated}</time>
        </p>
        <p className="text-xs">
          Administrado por: Maflux Studio y San Ignacio (Uruguay)
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">1. Aceptación de los términos</h2>
        <p>
          El acceso y uso de este sitio web implica la aceptación plena de estos
          Términos y Condiciones. Si el usuario no está de acuerdo, deberá
          abstenerse de utilizar los servicios ofrecidos.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">2. Objeto del servicio</h2>
        <p>
          Recursos San Ignacio es una plataforma destinada a la gestión de
          recursos educativos y administrativos, que permite:
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>Subir imágenes y archivos para impresión.</li>
          <li>Realizar pedidos o encargos de impresión.</li>
          <li>Reservar computadoras para uso docente.</li>
        </ul>
        <p>
          El personal autorizado procesa las impresiones, notifica al usuario
          cuando están listas y actualiza el registro interno de cuponera.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">3. Uso permitido</h2>
        <p>El usuario se compromete a:</p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            Utilizar la plataforma exclusivamente con fines educativos o
            administrativos.
          </li>
          <li>
            No subir material ilegal, ofensivo o protegido por derechos de autor
            sin autorización.
          </li>
          <li>
            No intentar vulnerar la seguridad, alterar el sistema o acceder a
            recursos no autorizados.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">4. Propiedad intelectual</h2>
        <p>
          El diseño, la interfaz, la estructura y los contenidos originales del
          sitio son propiedad de Maflux Studio y San Ignacio. Los archivos e
          imágenes subidos por los usuarios son de su propiedad, pero el usuario
          otorga al Sitio una licencia limitada, no exclusiva, para almacenarlos
          y gestionarlos dentro del servicio.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">
          5. Limitación de responsabilidad
        </h2>
        <p>
          El sitio se ofrece “tal cual” y no garantiza disponibilidad continua
          ni ausencia de errores. Maflux Studio y San Ignacio no serán
          responsables por daños directos o indirectos derivados del uso o
          imposibilidad de uso del servicio.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">
          6. Suspensión y cancelación de cuentas
        </h2>
        <p>
          Los administradores pueden suspender temporal o cancelar cuentas que
          incumplan estos Términos, sin perjuicio de acciones legales
          adicionales.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">
          7. Legislación aplicable y jurisdicción
        </h2>
        <p>
          Estos Términos se rigen por las leyes de la República Oriental del
          Uruguay. Cualquier disputa se somete a los tribunales competentes de
          Montevideo, Uruguay.
        </p>
      </section>

      <footer className="text-muted-foreground mt-8 border-t pt-5 text-center text-xs">
        <p>
          Para cualquier duda o asistencia legal, contacta a los administradores
          a través de{" "}
          <a
            href={`mailto:${adminContact}`}
            className="text-primary hover:underline"
          >
            {adminContact}
          </a>
          .
        </p>
      </footer>
    </main>
  );
}
