import React from "react";

type Props = {
  className?: string;
};

const lastUpdated = "9 de octubre de 2025";
const adminContact = "privacy@recursos-sanignacio.example";

export default function PrivacyPolicy({ className = "" }: Props) {
  return (
    <main
      className={`mx-auto max-w-2xl space-y-10 p-6 text-sm sm:p-8 sm:text-[15px] lg:p-10 ${className}`}
      aria-labelledby="privacy-title"
    >
      <header className="space-y-1 text-center">
        <h1
          id="privacy-title"
          className="text-2xl font-bold tracking-tight sm:text-3xl"
        >
          Política de Privacidad — Recursos San Ignacio
        </h1>
        <p className="text-muted-foreground">
          Última actualización: <time dateTime="2025-10-09">{lastUpdated}</time>
        </p>
        <p className="text-xs">
          Administrado por: Maflux Studio y San Ignacio (Uruguay)
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">1. Introducción</h2>
        <p>
          En <strong>Recursos San Ignacio</strong> respetamos la privacidad de
          nuestros usuarios y estamos comprometidos con la protección de sus
          datos personales. Esta política detalla qué información recopilamos,
          cómo la utilizamos y cuáles son los derechos del usuario respecto a
          ella.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">
          2. Información que recopilamos
        </h2>
        <p>
          Recopilamos la información mínima necesaria para el correcto
          funcionamiento del servicio:
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li>
            <strong>Datos de cuenta:</strong> nombre, correo electrónico y rol.
          </li>
          <li>
            <strong>Contraseña cifrada:</strong> almacenada de forma encriptada
            y no accesible para nadie (Ni nosotros).
          </li>
          <li>
            <strong>Preferencias de usuario:</strong> tema visual.
          </li>
          <li>
            <strong>Cookies:</strong> utilizadas para mantener la sesión
            iniciada y recordar las preferencias de tema.
          </li>
          <li>
            <strong>Contenido subido:</strong> imágenes y archivos que el
            usuario carga para impresión o gestión administrativa.
          </li>
          <li>
            <strong>Registros de actividad:</strong> historial de impresiones,
            encargos y reservas de computadoras.
          </li>
        </ul>
        <p className="text-muted-foreground italic">
          No recopilamos información financiera ni datos sensibles.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">3. Finalidad del tratamiento</h2>
        <p>Los datos se utilizan exclusivamente para:</p>
        <ol className="list-decimal space-y-1.5 pl-5">
          <li>Autenticar y mantener la sesión del usuario.</li>
          <li>Procesar y gestionar impresiones, encargos y reservas.</li>
          <li>Notificar al usuario sobre el estado de sus solicitudes.</li>
          <li>Mantener las preferencias de configuración personal.</li>
          <li>
            Preservar la seguridad y el correcto funcionamiento del sistema.
          </li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">4. Conservación de los datos</h2>
        <p>
          Los datos se conservan mientras la cuenta del usuario permanezca
          activa o mientras sean necesarios para la prestación del servicio. Los
          usuarios pueden solicitar la eliminación de su cuenta comunicándose
          con los administradores.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">5. Seguridad</h2>
        <p>
          Las contraseñas se almacenan encriptadas y los accesos están
          restringidos al personal autorizado. Aplicamos medidas técnicas y
          organizativas razonables para proteger la información contra accesos
          no autorizados o pérdida.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">6. Cesión a terceros</h2>
        <p>
          No compartimos ni transferimos datos personales a terceros, salvo por
          obligación legal o requerimiento de autoridad competente.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">7. Derechos del usuario</h2>
        <p>
          Los usuarios pueden ejercer sus derechos de acceso, rectificación,
          actualización o eliminación de datos personales comunicándose a
          <a
            href={`mailto:${adminContact}`}
            className="text-primary ml-1 font-medium hover:underline"
          >
            {adminContact}
          </a>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">8. Modificaciones</h2>
        <p>
          Esta política puede actualizarse sin previo aviso. La versión vigente
          se publicará siempre en este sitio con su fecha de actualización.
        </p>
      </section>

      <footer className="text-muted-foreground mt-8 border-t pt-5 text-center text-xs">
        <p>
          Si necesitas asistencia adicional o deseas solicitar la eliminación de
          tu cuenta, contacta con los administradores a través de{" "}
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
