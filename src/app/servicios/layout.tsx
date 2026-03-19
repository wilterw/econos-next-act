import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios | ECONOS - Soluciones de IA para Inmobiliarias",
  description: "Descubre nuestros servicios de Inteligencia Artificial para el sector inmobiliario.",
  openGraph: {
    title: "Servicios ECONOS",
    images: ["/assets/img/hero service.jpg"],
    type: "website",
  },
  alternates: {
    canonical: "https://econos.io/servicios",
  },
};

export default function ServiciosLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}