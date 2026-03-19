import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto | ECONOS",
  description: "Hablemos de digitalizar tu inmobiliaria. Contáctanos o agenda una reunión.",
  openGraph: {
    title: "Contacto ECONOS",
    type: "website",
  },
  alternates: {
    canonical: "https://econos.io/contacto",
  },
};

export default function ContactoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}