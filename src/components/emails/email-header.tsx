import { Heading, Img, Link } from "@react-email/components";
const baseUrl = process.env.AUTH_URL;

export function EmailHeader() {
  return (
    <Link href={baseUrl} className="flex items-center text-gray-800">
      <Img
        src={`${baseUrl}/printer.png`}
        width="32"
        height="32"
        className="mr-1 -ml-1"
        alt="Logo"
      />
      <Heading as="h1" className="m-0 text-3xl font-bold">
        Recursos San Ignacio
      </Heading>
    </Link>
  );
}
