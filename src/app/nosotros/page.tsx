"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../context/languagecontext";

import Typewriter from "../../components/typewriter";
import Magnetic from "../../components/magnetic";
import TextMask from "../../components/textmask";
import MethodologyScroll from "../../components/methodologyscroll";
import { RevealParent, RevealChild } from "../../components/fadein";
import FadeInSection from "../../components/fadeinsection";

// ─────────────────────────────────────────────
// SECCIÓN 2: QUIÉNES SOMOS (Texto Editorial)
// ─────────────────────────────────────────────
function QuienesSomosTextSection() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const watermarkText = isEn ? "WHO\nWE ARE" : "QUIÉNES\nSOMOS";
  const paragraphText = isEn
    ? "A technology company specialized in real estate digitization. We combine real industry experience with a resolute and practical mindset."
    : "Una empresa tecnológica especializada en digitalización inmobiliaria. Combinamos experiencia real en el sector con una mentalidad resolutiva y práctica.";

  return (
    <section style={{
      position: "relative",
      width: "100%",
      backgroundColor: "transparent",
      padding: "150px 20px 50px 20px",
      overflow: "hidden",
      zIndex: 10
    }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", minHeight: "350px", display: "flex", alignItems: "center" }}>

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ position: "absolute", top: 0, left: "-20px", zIndex: 0, pointerEvents: "none" }}
        >
          <h2 style={{
            fontSize: "clamp(5rem, 12vw, 13rem)",
            fontWeight: 400,
            color: "#DEDEDE",
            lineHeight: 0.85,
            whiteSpace: "pre-line",
            margin: 0,
            textTransform: "uppercase",
            fontFamily: "'Space Grotesk', var(--font-space, sans-serif)",
            letterSpacing: "-0.03em"
          }}>
            {watermarkText}
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          style={{
            position: "relative",
            zIndex: 1,
            marginLeft: "clamp(40px, 15vw, 300px)",
            marginTop: "120px",
            maxWidth: "480px",
            fontSize: "clamp(1.2rem, 2vw, 1.4rem)",
            color: "#2D2418",
            lineHeight: 1.5,
            fontWeight: 500
          }}
        >
          {paragraphText}
        </motion.p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// SECCIÓN 3: MISIÓN Y RAZÓN DE SER
// ─────────────────────────────────────────────
function MisionRazonSection() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const tTitle1 = isEn ? "Our mission" : "Nuestra misión";
  const tDesc1 = isEn
    ? "To equip our clients with technological power to lead digital development and close more sales."
    : "Dotar de fuerza tecnológica a nuestros clientes para liderar el desarrollo digital y cerrar más ventas.";

  const tTitle2 = isEn ? "Our reason for being" : "Nuestra razón de ser";

  // 🟢 TEXTO RESUMIDO Y DIRECTO (Traducible)
  const tDesc2 = isEn
    ? "We democratize advanced technology to close the digital gap, empowering independent agencies to compete at the highest level."
    : "Democratizamos la tecnología avanzada para cerrar la brecha digital, permitiendo a las agencias independientes competir al más alto nivel.";

  return (
    <section style={{
      position: "relative",
      width: "100%",
      backgroundColor: "transparent",
      padding: "50px 20px 150px 20px",
      zIndex: 10
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "60px" }}>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ flex: "1.2 1 500px" }}
        >
          <div style={{ width: "100%", borderRadius: "0px", overflow: "hidden" }}>
            <img
              src="/assets/img/mision-equipo.jpg"
              alt="Equipo ECONOS"
              style={{ width: "100%", height: "auto", objectFit: "cover", display: "block" }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          style={{ flex: "1 1 400px", display: "flex", flexDirection: "column", paddingLeft: "20px", fontFamily: "'Inter', sans-serif", color: "#2D2418" }}
        >
          <div style={{ marginBottom: "50px" }}>
            <h2 style={{ fontSize: "clamp(2.5rem, 4vw, 3.2rem)", fontWeight: 700, margin: "0 0 20px 0", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              {tTitle1}
            </h2>
            <p style={{ fontSize: "clamp(1.3rem, 2vw, 1.5rem)", fontWeight: 600, margin: 0, lineHeight: 1.4 }}>
              {tDesc1}
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: "clamp(2.5rem, 4vw, 3.2rem)", fontWeight: 700, margin: "0 0 20px 0", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              {tTitle2}
            </h2>
            {/* Aumentamos un poquito el tamaño de la fuente para darle más peso al resumen */}
            <p style={{ fontSize: "1.2rem", fontWeight: 500, margin: 0, lineHeight: 1.6 }}>
              {tDesc2}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// SECCIÓN 5: RESULTADOS — Carrusel Activo con Estado y AnimatePresence
// ─────────────────────────────────────────────
function ResultsSection() {
  const { t } = useLanguage();
  const mainRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      let index = Math.floor(latest * 5);
      if (index >= 5) index = 4;
      if (index < 0) index = 0;
      setActiveIndex(index);
    });
  }, [scrollYProgress]);

  const listKeys = ["home.results.list1", "home.results.list2", "home.results.list3", "home.results.list4", "home.results.list5"];
  const nums = ["01", "02", "03", "04", "05"];

  const rawTitle = t("home.results.title");
  const titleStr = (typeof rawTitle === "string" && rawTitle !== "home.results.title")
    ? rawTitle
    : "Resultados reales que notarás desde el primer mes";

  return (
    <>
      <style>{`
          .results-card-inner {
              display: flex;
              align-items: center;
              width: 100%;
              max-width: 650px;
              background: rgba(20, 20, 25, 0.85);
              backdrop-filter: blur(20px);
              border: 1px solid rgba(255,255,255,0.05);
              border-radius: 32px;
              padding: 40px 40px;
              box-shadow: 0 30px 60px rgba(0,0,0,0.5);
              gap: 30px;
          }
          .results-card-num {
              font-size: 5rem;
              font-weight: 800;
              line-height: 0.8;
              color: #CC0000;
              font-family: var(--font-space);
              flex-shrink: 0;
          }
          .results-card-content {
              display: flex;
              flex-direction: column;
          }
          .results-card-text {
              font-size: clamp(1.4rem, 2vw, 1.8rem);
              font-weight: 600;
              color: #fff;
              margin: 0;
              line-height: 1.3;
          }

          @media (max-width: 900px) {
              .results-column-wrapper {
                  flex-direction: column !important;
              }
              .results-title-col {
                  padding-bottom: 20px !important;
                  display: flex;
                  align-items: flex-end;
              }
              .results-cards-col {
                  align-items: flex-start !important;
              }
          }

          @media (max-width: 768px) {
              .results-card-inner {
                  flex-direction: column;
                  padding: 30px 25px;
                  gap: 20px;
                  border-radius: 24px;
                  align-items: flex-start;
              }
              .results-card-num { font-size: 4rem; }
              .results-card-text { font-size: 1.3rem; }
          }
      `}</style>

      <section ref={mainRef} style={{
        position: "relative", width: "100%",
        height: "500vh",
        backgroundColor: "transparent",
        zIndex: 30
      }}>
        <div style={{
          position: "sticky", top: 0, height: "100dvh", width: "100%", overflow: "hidden",
          display: "flex", alignItems: "center"
        }}>
          <div className="container results-column-wrapper" style={{ display: "flex", width: "100%", height: "100%" }}>

            {/* LEFT: Título Fijo */}
            <div className="results-title-col" style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", paddingRight: "5vw" }}>
              <motion.h2
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, color: "#0A0A0C", margin: 0, letterSpacing: "-0.02em", lineHeight: 1.05 }}
                dangerouslySetInnerHTML={{ __html: titleStr }}
              />

              <motion.div
                animate={{ opacity: activeIndex === 4 ? 1 : 0, y: activeIndex === 4 ? 0 : 20 }}
                transition={{ duration: 0.5 }}
                style={{ marginTop: "30px", pointerEvents: activeIndex === 4 ? "auto" : "none" }}
              >
                <p className="results-footer-text" dangerouslySetInnerHTML={{ __html: t("home.results.footer") }} style={{ margin: 0, color: "#2D2418", fontSize: "0.95rem" }} />
              </motion.div>
            </div>

            {/* RIGHT: Carrusel de Tarjetas Activas mediante ESTADO */}
            <div className="results-cards-col" style={{ flex: 1, position: "relative", height: "100%", display: "flex", alignItems: "center", justifyContent: "flex-start" }}>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -60 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  style={{ position: "absolute", width: "100%", display: "flex" }}
                >
                  <div className="results-card-inner">
                    <span className="results-card-num">{nums[activeIndex]}</span>
                    <div className="results-card-content">
                      <p className="results-card-text">{t(listKeys[activeIndex])}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

          </div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "150px", background: "linear-gradient(to bottom, transparent, #FDFBF7)", zIndex: 3, pointerEvents: "none" }} />
      </section>
    </>
  );
}

// ─── Main content ──────────────────────────────────────────────────
function NosotrosContent() {
  const { t } = useLanguage();

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroBgY = useTransform(heroProgress, [0, 1], ["0%", "20%"]);

  const ctaRef = useRef(null);
  const ctaView = useInView(ctaRef, { once: true, margin: "-15%" });

  return (
    <>
      {/* ─── 1. HERO con parallax real del fondo y texto más arriba y brillante ─── */}
      <section ref={heroRef} className="banner-hero-section" style={{ position: "relative", overflow: "hidden" }}>
        <motion.div
          style={{
            y: heroBgY,
            position: "absolute",
            inset: "-10% 0",
            backgroundImage: "url('/assets/img/hero nosotros.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
            filter: "brightness(1.6) saturate(1.1)", // 🟢 Añadido el brightness 1.8
          }}
        />
        {/* 🟢 Texto alineado a la izquierda (flex-start) y con margen negativo para subirlo */}
        <motion.div className="container" style={{ position: "relative", zIndex: 2, y: heroY, opacity: heroOpacity, display: "flex", justifyContent: "flex-start", alignItems: "center", height: "100%", marginTop: "-25vh" }}>
          <Typewriter text={t("header.about").toUpperCase()} className="banner-hero-title" />
        </motion.div>

        {/* Soft edge fade at the bottom to blend to cream background */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "150px", background: "linear-gradient(to bottom, transparent, #FDFBF7)", zIndex: 3, pointerEvents: "none" }} />
      </section>

      {/* ─── 2. QUIÉNES SOMOS ─── */}
      <FadeInSection>
        <QuienesSomosTextSection />
      </FadeInSection>

      {/* ─── 3. MISIÓN Y RAZÓN DE SER ─── */}
      <FadeInSection>
        <MisionRazonSection />
      </FadeInSection>

      {/* ─── 4. MÉTODO (Scroll Interactivo) ─── */}
      <FadeInSection>
        <MethodologyScroll />
      </FadeInSection>

      {/* ─── 5. RESULTADOS REALES (Desde el Home) ─── */}
      <FadeInSection>
        <ResultsSection />
      </FadeInSection>

      {/* ─── 6. CTA FINAL — spring entrance ─── */}
      <FadeInSection>
        <section
          className="home-section section-digital-cta"
          style={{ backgroundImage: `url(${t("home.cta_digital.bg")})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}
        >
          {/* Soft edge fade at the top to blend from cream background */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "150px", background: "linear-gradient(to bottom, #FDFBF7, transparent)", zIndex: 1, pointerEvents: "none" }} />

          <div className="container cta-container" style={{ position: "relative", zIndex: 2 }}>
            <motion.div
              ref={ctaRef}
              className="cta-box"
              initial={{ y: 80, opacity: 0 }}
              animate={ctaView ? { y: 0, opacity: 1 } : {}}
              transition={{ type: "spring", stiffness: 70, damping: 18, mass: 1 }}
            >
              <TextMask>
                <h2 className="cta-heading" style={{ margin: 0 }}>{t("home.cta_digital.line1")}</h2>
              </TextMask>
              <motion.p
                className="cta-subheading"
                style={{ marginTop: "15px" }}
                initial={{ opacity: 0, y: 20 }}
                animate={ctaView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {t("home.cta_digital.line2")}
              </motion.p>
              <motion.div
                className="cta-action"
                style={{ marginTop: "30px" }}
                initial={{ opacity: 0, y: 20 }}
                animate={ctaView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.45, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Magnetic strength={0.4}>
                  <Link href="/contacto" className="btn-white-expert" style={{ display: "inline-block" }}>
                    {t("home.cta_digital.btn")}
                  </Link>
                </Magnetic>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}

// ─── Hydration-safe wrapper ───────────────────────────────────────
export default function Nosotros() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <main style={{ minHeight: "100vh", background: "transparent" }} />;
  return <NosotrosContent />;
}