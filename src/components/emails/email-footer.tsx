import { Link, Text } from "@react-email/components";

export default function EmailFooter() {
  return (
    <Text className="mt-5 text-center text-xs text-gray-500">
      <Link
        href="https://github.com/sanignacio/recursos-sanignacio"
        className="font-semibold text-gray-500"
      >
        Recursos San Ignacio
      </Link>
      ・ Creado por{" "}
      <Link
        href="https://github.com/0-Sandy"
        className="px-1 text-gray-500 underline underline-offset-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        Martin
      </Link>
      <Link
        href="#"
        className="px-1 text-gray-500 underline underline-offset-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        Máximo
      </Link>
      <Link
        href="https://github.com/facuandy"
        className="px-1 text-gray-500 underline underline-offset-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        Facundo
      </Link>
      <Link
        href="#"
        className="px-1 text-gray-500 underline underline-offset-2"
        target="_blank"
        rel="noopener noreferrer"
      >
        Alejandro
      </Link>
    </Text>
  );
}
