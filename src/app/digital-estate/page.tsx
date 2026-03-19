"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/languagecontext";

// ─────────────────────────────────────────────
// SECCIÓN 1: HERO (Imagen completa + Letras reducidas)
// ─────────────────────────────────────────────
function HeroSection() {
    const { t } = useLanguage();

    const rawTitle = t("landing.hero.title");
    const titleText = (typeof rawTitle === "string" && rawTitle !== "landing.hero.title")
        ? rawTitle
        : "Digital Estate AI: la tecnología que las grandes franquicias no quieren que tengas";

    const rawSubtitle = t("landing.hero.subtitle");
    const subtitleText = (typeof rawSubtitle === "string" && rawSubtitle !== "landing.hero.subtitle")
        ? rawSubtitle
        : "Más visitas, más cierres y menos carga operativa. Un equipo experto, cercano y resolutivo a tu lado y un ecosistema creado para que las agencias compitan sin desventajas.";

    const rawCta = t("landing.hero.cta");
    const ctaText = (typeof rawCta === "string" && rawCta !== "landing.hero.cta")
        ? rawCta
        : "Hablar con un experto →";

    return (
        <section className="digital-hero" style={{
            position: "relative",
            width: "100%",
            minHeight: "100dvh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            backgroundColor: "transparent"
        }}>
            {/* FONDO: Configurado para mostrarse completo */}
            <div
                className="hero-bg-landing"
                style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0
                }}
            />

            {/* CONTENIDO */}
            <div className="container hero-content" style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 20px" }}>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="hero-title"
                    style={{
                        color: "#fff",
                        fontFamily: "'Space Grotesk', var(--font-space, sans-serif)",
                        fontWeight: 700, // Reducimos un poco el peso visual
                        margin: "0 auto 15px",
                        lineHeight: 1.2,
                        maxWidth: "900px",
                        letterSpacing: "-0.01em",
                        textShadow: "0 2px 15px rgba(0,0,0,0.8)"
                    }}
                >
                    {titleText}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="hero-subtitle"
                    style={{
                        color: "#fff",
                        fontFamily: "'Inter', sans-serif",
                        maxWidth: "700px",
                        margin: "0 auto 35px",
                        lineHeight: 1.6,
                        fontWeight: 400,
                        textShadow: "0 2px 10px rgba(0,0,0,0.8)"
                    }}
                >
                    {subtitleText}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                    <Link href="/contacto" className="hero-btn" style={{
                        display: "inline-block",
                        backgroundColor: "#fff",
                        color: "#000",
                        padding: "16px 35px",
                        borderRadius: "6px",
                        fontSize: "1rem",
                        fontWeight: 600,
                        textDecoration: "none",
                        transition: "all 0.3s ease",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
                    }}>
                        {ctaText}
                    </Link>
                </motion.div>

            </div>
        </section>
    );
}

export default function DigitalEstateLanding() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <main style={{ minHeight: "100vh", backgroundColor: "transparent" }} />;

    return (
        <main style={{ backgroundColor: "transparent", overflowX: "hidden" }}>
            <style>{`
        /* Configuración de la imagen de fondo para PC */
        .hero-bg-landing {
          background-image: url('/assets/img/fondo landing.jpg');
          background-size: contain; /* Asegura que la imagen entre completa sin cortes */
          background-position: center;
          background-repeat: no-repeat;
        }

        /* Reducción de tamaños de letra (Uso de clamp más moderado) */
        .hero-title {
          font-size: clamp(2rem, 5vw, 3.5rem);
        }
        .hero-subtitle {
          font-size: clamp(1rem, 1.5vw, 1.2rem);
        }

        /* Ajustes para MÓVILES */
        @media (max-width: 768px) {
          .hero-bg-landing {
            background-size: 100% auto !important; /* Entra completa a lo ancho */
            background-position: top center !important; 
          }

          .digital-hero {
            align-items: flex-end !important;
            padding-bottom: 40px;
          }

          .hero-content {
            text-align: left !important;
            padding: 0 20px !important;
            /* Ajuste para que el texto empiece justo donde termina la parte visual de la imagen */
            padding-top: 65vw !important; 
          }

          .hero-title {
            font-size: 1.8rem !important;
            margin-bottom: 15px !important;
          }

          .hero-subtitle {
            font-size: 1rem !important;
            margin-bottom: 30px !important;
          }

          .hero-btn {
            width: 100%;
            text-align: center;
            padding: 14px 20px !important;
          }
        }
      `}</style>

            <HeroSection />

            {/* Siguiente paso: Sección Manifiesto */}

        </main>
    );
}