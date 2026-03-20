"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from "framer-motion";
import { RevealParent, RevealChild } from "../components/fadein";
import { useLanguage } from "../context/languagecontext";

import Magnetic from "../components/magnetic";
import TextMask from "../components/textmask";
import EcosystemScroll from "../components/ecosystemscroll";
import TiltCard from "../components/tiltcard";
import SplitText from "../components/splittext";
import MethodologyScroll from "../components/methodologyscroll";
import FadeInSection from "../components/fadeinsection";

// ─────────────────────────────────────────────
// Scroll Progress Bar
// ─────────────────────────────────────────────
function ScrollProgressLine({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "rgba(0,0,0,0.07)", overflow: "hidden",
    }}>
      <motion.div style={{ scaleX, transformOrigin: "left", height: "100%", background: "linear-gradient(90deg, #4A90E2, #2D2418)" }} />
    </div>
  );
}

// ─────────────────────────────────────────────
// Floating particles
// ─────────────────────────────────────────────
function FloatingParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 3 + 1, duration: Math.random() * 8 + 6, delay: Math.random() * 4,
  }));

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1, overflow: "hidden" }}>
      {particles.map((p) => (
        <motion.div key={p.id}
          style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: "50%", background: "rgba(255,255,255,0.5)", boxShadow: "0 0 6px rgba(255,255,255,0.4)" }}
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// Gradient text that reveals on scroll
// ─────────────────────────────────────────────
function GradientRevealText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "end 40%"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.7, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [24, 0]);

  return <motion.div ref={ref} style={{ opacity, y }} className={className}>{children}</motion.div>;
}

// ─────────────────────────────────────────────
// SECCIÓN INDEPENDIENTE: TEXTO DEL ECOSISTEMA
// ─────────────────────────────────────────────
function EcosystemTextIntro() {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [1, 1, 0, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [1, 1, 1.05, 1.05]);

  const rawTitle = t("home.eco.title");
  const titleStr = (typeof rawTitle === "string" && rawTitle !== "home.eco.title") ? rawTitle : "El ecosistema Digital Estate AI";

  const rawDesc = t("home.eco.desc");
  const descStr = (typeof rawDesc === "string" && rawDesc !== "home.eco.desc")
    ? rawDesc
    : "Technology designed for your real estate agency to work in an agile, professional, and efficient way.";
  const descWords = descStr.split(" ");

  const wordVariant = {
    hidden: { opacity: 0, display: "none" },
    visible: { opacity: 1, display: "inline-block" }
  };

  return (
    <section ref={ref} style={{
      minHeight: "100dvh",
      position: "relative", zIndex: 10,
    }}>

      <div style={{ position: "sticky", top: 0, minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 20px" }}>
        <motion.div style={{ opacity, scale, textAlign: "center", maxWidth: "1000px", width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

            <motion.h1
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={{ hidden: { opacity: 1 }, visible: { transition: { staggerChildren: 0.04 } } }}
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 800, color: "#fff",
                fontFamily: "var(--font-space)", lineHeight: 1.1, margin: "0",
                letterSpacing: "-0.03em", textShadow: "0 10px 40px rgba(0,0,0,0.9)",
                display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.25em"
              }}>
              {titleStr.split(" ").map((word, wordIndex) => (
                <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                  {Array.from(word).map((char, charIndex) => (
                    <motion.span key={charIndex} variants={wordVariant}>{char}</motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>

          </div>

          <motion.p
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            variants={{ hidden: { opacity: 1 }, visible: { transition: { staggerChildren: 0.05, delayChildren: 1.5 } } }}
            style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", color: "rgba(255,255,255,0.8)", marginTop: "clamp(20px, 4vw, 40px)", lineHeight: 1.5, fontWeight: 400, textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>
            {descWords.map((word, index) => (
              <motion.span key={index} variants={wordVariant} style={{ marginRight: "0.25em" }}>{word}</motion.span>
            ))}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// SECCIÓN: CONFIANZA Y DIGITALIZA
// ─────────────────────────────────────────────
function DigitizeSection() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const imageSrc = "/assets/img/digitaliza.jpg";

  const watermarkText = isEn ? "TRUST AND\nTRANSPARENCY" : "CONFIANZA\nY TRANSPARENCIA";
  const p1 = isEn ? "No hidden mediations or commissions.\nProprietary and secure architecture." : "Sin mediaciones ni comisiones ocultas.\nArquitectura propia y segura.";
  const p2 = isEn ? "On-prem options for total control.\nStable integrations made by experts." : "Opciones on-prem para control total.\nIntegraciones estables hechas por expertos.";
  const mainTitle = isEn ? "Digitize or die trying.\nThe change is now." : "Digitaliza o muere en el\nintento. El\ncambio es\nahora.";

  return (
    <section style={{
      position: "relative", width: "100%", backgroundColor: "transparent",
      padding: "clamp(80px, 10vw, 150px) 20px", overflow: "hidden", zIndex: 10
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>

        <motion.div
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 1, ease: "easeOut" }}
          style={{ position: "absolute", top: "clamp(-40px, -8vw, -80px)", left: 0, zIndex: 0, pointerEvents: "none" }}
        >
          <h2 style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)", fontWeight: 800, color: "#DEDEDE", lineHeight: 0.85, whiteSpace: "pre-line", margin: 0, textTransform: "uppercase", fontFamily: "'Space Grotesk', var(--font-space, sans-serif)", letterSpacing: "-0.02em", wordBreak: "break-word" }}>
            {watermarkText}
          </h2>
        </motion.div>

        <div style={{ position: "relative", zIndex: 1, marginBottom: "clamp(40px, 8vw, 80px)", paddingTop: "clamp(40px, 8vw, 60px)", paddingLeft: "clamp(0px, 4vw, 20px)" }}>
          <motion.p initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)", color: "#2D2418", lineHeight: 1.6, fontWeight: 500, whiteSpace: "pre-line", marginBottom: "20px" }}>{p1}</motion.p>
          <motion.p initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)", color: "#2D2418", lineHeight: 1.6, fontWeight: 500, whiteSpace: "pre-line", margin: 0 }}>{p2}</motion.p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(30px, 6vw, 60px)", position: "relative", zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, scale: 0.95, y: 40 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8, ease: "easeOut" }} style={{ flex: "1 1 min(100%, 400px)" }}>
            <img src={imageSrc} alt="Digitaliza" style={{ width: "100%", height: "auto", borderRadius: "12px", boxShadow: "0 20px 40px rgba(0,0,0,0.1)", objectFit: "cover" }} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }} style={{ flex: "1 1 min(100%, 350px)" }}>
            <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 700, color: "#2D2418", lineHeight: 1.05, margin: 0, whiteSpace: "pre-line", letterSpacing: "-0.02em", fontFamily: "'Space Grotesk', var(--font-space, sans-serif)", wordBreak: "break-word" }}>
              {mainTitle}
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// RESULTS SECTION — Carrusel Activo con Estado y AnimatePresence
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

// ─────────────────────────────────────────────
// Main page content
// ─────────────────────────────────────────────
function HomeContent() {
  const { t, language } = useLanguage();

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroProgress, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroProgress, [0, 0.8], [1, 0]);
  const heroBgY = useTransform(heroProgress, [0, 1], ["0%", "20%"]);

  const ctaRef = useRef(null);
  const ctaView = useInView(ctaRef, { once: true, margin: "-15%" });

  // 🟢 Lógica de Imagen para Ramon (Español vs Inglés)
  const ramonImgSrc = language === "en" ? "/assets/img/ramon-en.jpg" : "/assets/img/ramon.jpg";

  // FÓRMULA RESUMEN PARA LA SECCIÓN GAP
  const gapSummaryText = language === "en"
    ? "<strong>Expert technology</strong> + <strong>Custom design</strong> + <strong>Tech partner</strong> = <br/><span class='gap-final-bold' style='display: block; margin-top: 15px; font-size: 1.2em; font-weight: 800; letter-spacing: -0.02em;'>Tangible results for your business.</span>"
    : "<strong>Tecnología experta</strong> + <strong>Diseño personalizado</strong> + <strong>Partner tecnológico</strong> = <br/><span class='gap-final-bold' style='display: block; margin-top: 15px; font-size: 1.2em; font-weight: 800; letter-spacing: -0.02em;'>Resultados tangibles en tu negocio.</span>";

  return (
    <>
      <style>{`
        /* 🟢 REGLAS MÓVILES TOTALMENTE OPTIMIZADAS 🟢 */
        @media (max-width: 768px) {
          .home-hero { min-height: 100dvh !important; }
          .hero-bg-layer {
            background-size: cover !important; 
            /* 🟢 Desplazamos la imagen a la derecha para intentar esconder el logo viejo */
            background-position: 80% center !important; 
            background-repeat: no-repeat !important; 
            inset: -5% 0 !important; 
            transform: none !important; 
          }
          
          /* 🟢 NUEVO: Capa de oscuridad intensa solo para móviles para ocultar el texto de la foto */
          .hero-bg-layer::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, rgba(15,10,10,0.85) 0%, rgba(15,10,10,0.6) 40%, rgba(15,10,10,0.95) 100%) !important;
            z-index: 1;
          }

          .hero-bottom-layout {
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important; 
            padding-top: 15vh !important; 
            padding-bottom: 40px !important;
          }
          .hero-h1-split { font-size: clamp(2.5rem, 10vw, 3.5rem) !important; line-height: 1.1 !important; white-space: normal !important; word-wrap: break-word !important; }
          .hero-col-left, .hero-col-right { width: 100% !important; padding: 0 15px !important; text-align: left !important; }
          .hero-desc { font-size: 1.1rem !important; }
          .hero-right-content { margin-top: 25px !important; }
          
          .gap-layout { display: flex !important; flex-direction: column !important; padding: 20px !important; gap: 40px !important; }
          .gap-col-image, .gap-col-content { width: 100% !important; }
          
          /* 🟢 IMAGEN CORREGIDA: Se quita el aspect-ratio y el cover para que no se recorte */
          .ramon-img { 
            width: 100% !important; 
            height: auto !important; 
            aspect-ratio: auto !important; 
            object-fit: contain !important; 
            object-position: center top !important; 
            border-radius: 16px !important; 
          }
          
          .identity-grid, .results-layout { display: flex !important; flex-direction: column !important; gap: 30px !important; }
          .identity-left, .identity-right, .results-left, .results-right { width: 100% !important; }
          .gap-title { font-size: 2.2rem !important; line-height: 1.2 !important; }
        }
      `}</style>

      {/* ─── 1. HERO ─── */}
      <section ref={heroRef} className="home-hero" style={{ position: "relative", overflow: "hidden", minHeight: "100dvh", display: "flex", alignItems: "center" }}>
        <motion.div
          className="hero-bg-layer"
          style={{
            y: heroBgY, position: "absolute", inset: "-10% 0", backgroundImage: `url('${t("home.hero.bg")}')`,
            backgroundSize: "cover", backgroundPosition: "center center", zIndex: 0, filter: "brightness(1.6) saturate(1.1)"
          }}
        />
        <FloatingParticles />
        <motion.div className="container hero-bottom-layout" style={{ position: "relative", zIndex: 2, y: heroY, opacity: heroOpacity, width: "100%", height: "100%", paddingBottom: "120px" }}>
          <RevealParent className="hero-col-left">
            <div style={{ overflow: "hidden" }}>
              <SplitText className="hero-h1-split" delay={0.1} stagger={0.07} tag="h1">{t("home.hero.tagline")}</SplitText>
            </div>
          </RevealParent>
          <RevealParent className="hero-col-right" staggerDelay={0.3}>
            <div className="hero-right-content">
              <RevealChild><p className="hero-desc" dangerouslySetInnerHTML={{ __html: t("home.hero.desc") }} style={{ textShadow: "0 2px 10px rgba(0,0,0,0.9)" }} /></RevealChild>
              <RevealChild><div style={{ marginTop: "30px" }}><Magnetic strength={0.3}><Link href="/contacto" className="btn-primary btn-hero-white">{t("home.hero.cta")}</Link></Magnetic></div></RevealChild>
            </div>
          </RevealParent>
        </motion.div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "150px", background: "linear-gradient(to bottom, transparent, #FDFBF7)", zIndex: 3, pointerEvents: "none" }} />
      </section>

      {/* ─── 2. IDENTITY ─── */}
      <FadeInSection>
        <section className="home-section section-identity" style={{ position: "relative", backgroundColor: "transparent" }}>
          <div className="container">
            <RevealParent className="identity-grid" staggerDelay={0.2}>

              <div className="identity-left">
                <TextMask delay={0.2}><h2 className="big-title" dangerouslySetInnerHTML={{ __html: t("home.identity.title") }} style={{ margin: 0 }} /></TextMask>
              </div>

              <motion.div
                className="identity-right"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                <p dangerouslySetInnerHTML={{ __html: t("home.identity.desc") }} />
              </motion.div>

            </RevealParent>

            {/* 🟢 TEXTO CORREGIDO: Animación estándar (como el resto) y color más oscuro */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ marginTop: "40px" }}
            >
              <p
                className="identity-hero-moved"
                style={{ color: "#2D2418", fontWeight: 600, margin: 0 }}
                dangerouslySetInnerHTML={{ __html: t("home.hero.title") }}
              />
            </motion.div>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "100px", background: "linear-gradient(to bottom, transparent, #FDFBF7)", zIndex: 3, pointerEvents: "none" }} />
        </section>
      </FadeInSection>

      {/* ─── 3. GAP (IMAGEN CON FLIP 3D + FÓRMULA RESUMEN + IMAGEN DINÁMICA) ─── */}
      <FadeInSection>
        <section className="home-section section-gap" style={{ backgroundColor: "transparent" }}>
          <RevealParent className="container gap-layout">
            <RevealChild className="gap-col-image">
              <div className="gap-image-container" style={{ perspective: 1000 }}>
                {/* 🟢 Imagen dinámica con key para forzar re-render y estilos sólidos para PC */}
                <motion.img
                  key={language}
                  src={ramonImgSrc}
                  alt="Experto IA"
                  className="ramon-img"
                  initial={{ rotateY: 90, opacity: 0, scale: 0.8 }}
                  whileInView={{ rotateY: 0, opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  style={{
                    transformStyle: "preserve-3d",
                    width: "100%",
                    height: "auto",
                    borderRadius: "16px",
                    objectFit: "cover",
                    display: "block"
                  }}
                />
              </div>
            </RevealChild>
            <div className="gap-col-content">
              <TextMask><h2 className="gap-title" dangerouslySetInnerHTML={{ __html: t("home.gap.title") }} style={{ margin: 0, paddingBottom: "20px" }} /></TextMask>

              <RevealParent className="gap-text-block" staggerDelay={0.15}>
                <RevealChild>
                  <p
                    style={{ fontSize: "clamp(1.2rem, 2vw, 1.4rem)", lineHeight: 1.6, color: "#2D2418" }}
                    dangerouslySetInnerHTML={{ __html: gapSummaryText }}
                  />
                </RevealChild>
              </RevealParent>

            </div>
          </RevealParent>
        </section>
      </FadeInSection>

      {/* ─── 4 & 5. ECOSYSTEM BUNDLE ─── */}
      <FadeInSection>
        <div style={{ position: "relative", backgroundImage: "url('/assets/img/fondo-digital.jpg')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "150px", background: "linear-gradient(to bottom, #FDFBF7, transparent)", zIndex: 1, pointerEvents: "none" }} />
          <EcosystemTextIntro />
          <EcosystemScroll hideTopFade={true} hideBottomFade={true} transparentBackground={true} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "150px", background: "linear-gradient(to bottom, transparent, #FDFBF7)", zIndex: 1, pointerEvents: "none" }} />
        </div>
      </FadeInSection>

      {/* ─── 6. RESULTS ─── */}
      <ResultsSection />

      {/* ─── 7. METHODOLOGY ─── */}
      <FadeInSection>
        <MethodologyScroll />
      </FadeInSection>

      {/* ─── 8. DIGITALIZA ─── */}
      <FadeInSection>
        <DigitizeSection />
      </FadeInSection>

      {/* ─── 9. CTA FINAL ─── */}
      <FadeInSection>
        <section
          className="home-section section-digital-cta"
          style={{ backgroundImage: `url(${t("home.cta_digital.bg")})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}
        >
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "150px", background: "linear-gradient(to bottom, #FDFBF7, transparent)", zIndex: 1, pointerEvents: "none" }} />
          <div className="container cta-container" style={{ position: "relative", zIndex: 2 }}>
            <motion.div ref={ctaRef} className="cta-box" initial={{ y: 80, opacity: 0 }} animate={ctaView ? { y: 0, opacity: 1 } : {}} transition={{ type: "spring", stiffness: 70, damping: 18, mass: 1 }}>
              <TextMask><h2 className="cta-heading" style={{ margin: 0 }}>{t("home.cta_digital.line1")}</h2></TextMask>
              <motion.p className="cta-subheading" style={{ marginTop: "15px" }} initial={{ opacity: 0, y: 20 }} animate={ctaView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.25, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}>
                {t("home.cta_digital.line2")}
              </motion.p>
              <motion.div className="cta-action" style={{ marginTop: "30px" }} initial={{ opacity: 0, y: 20 }} animate={ctaView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.45, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}>
                <Magnetic strength={0.4}><Link href="/contacto" className="btn-white-expert" style={{ display: "inline-block" }}>{t("home.cta_digital.btn")}</Link></Magnetic>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </FadeInSection>
    </>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) { return <main style={{ minHeight: "100vh", background: "transparent" }} />; }
  return <HomeContent />;
}