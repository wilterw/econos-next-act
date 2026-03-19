import type { Metadata } from "next";
import { Inter, Space_Grotesk, Inter_Tight } from "next/font/google";
import "./globals.css";

import Header from "../components/header";
import Footer from "../components/footer";
import SmoothScroll from "../components/smoothscroll";
import { LanguageProvider } from "../context/languagecontext";
import PageTransition from "../components/pagetransition";
import CustomCursor from "../components/customcursor";

// Configuración de fuentes
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-main",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ECONOS | Soluciones de IA Inmobiliaria",
  description: "Digitalizamos tu inmobiliaria con IA para que cierres más ventas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable} ${interTight.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LanguageProvider>
          {/* Cursor tecnológico (solo desktop) */}
          <CustomCursor />

          <SmoothScroll>
            <Header />
            {/* Cortinilla de transición entre páginas */}
            <PageTransition>
              <main>{children}</main>
            </PageTransition>
            <Footer />
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}