"use client";
import { useLanguage } from "../context/languagecontext";

// GlobalBackground — fondo fijo en todo el sitio (reemplaza el video)
// Usa la misma imagen del hero según el idioma activo: hero-bg.jpg / hero-bg-en.jpg
export default function GlobalBackground() {
  const { t } = useLanguage();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        backgroundImage: `url('${t("home.hero.bg")}')`,
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
        // Brightness ligero para que sea vivo pero no queme las secciones claras
        filter: "brightness(1.5) saturate(1.1)",
      }}
    />
  );
}