"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { RevealParent, RevealChild } from "../components/fadein";
import { useLanguage } from "../context/languagecontext";

import Magnetic from "../components/magnetic";
import TextMask from "../components/textmask";
import EcosystemScroll from "../components/ecosystemscroll";
import TiltCard from "../components/tiltcard";
import SplitText from "../components/splittext";
import MethodologyScroll from "../components/methodologyscroll";

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
// NUEVA SECCIÓN INDEPENDIENTE: TEXTO DEL ECOSISTEMA
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
      backgroundImage: "url('/assets/img/fondo-digital.jpg')",
      backgroundSize: "cover", backgroundPosition: "center",
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
// NUEVA SECCIÓN: CONFIANZA Y DIGITALIZA
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
      position: "relative",
      width: "100%",
      backgroundColor: "#F5F4F0",
      padding: "clamp(80px, 10vw, 150px) 20px",
      overflow: "hidden",
      zIndex: 10
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ position: "absolute", top: "clamp(-40px, -8vw, -80px)", left: 0, zIndex: 0, pointerEvents: "none" }}
        >
          <h2 style={{
            fontSize: "clamp(3.5rem, 9vw, 9rem)",
            fontWeight: 800,
            color: "#DEDEDE",
            lineHeight: 0.85,
            whiteSpace: "pre-line",
            margin: 0,
            textTransform: "uppercase",
            fontFamily: "'Space Grotesk', var(--font-space, sans-serif)",
            letterSpacing: "-0.02em"
          }}>
            {watermarkText}
          </h2>
        </motion.div>

        <div style={{ position: "relative", zIndex: 1, marginBottom: "clamp(40px, 8vw, 80px)", paddingTop: "clamp(40px, 8vw, 60px)", paddingLeft: "clamp(0px, 4vw, 20px)" }}>
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)", color: "#2D2418", lineHeight: 1.6, fontWeight: 500, whiteSpace: "pre-line", marginBottom: "20px" }}
          >
            {p1}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)", color: "#2D2418", lineHeight: 1.6, fontWeight: 500, whiteSpace: "pre-line", margin: 0 }}
          >
            {p2}
          </motion.p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(30px, 6vw, 60px)", position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ flex: "1 1 min(100%, 400px)" }}
          >
            <img
              src={imageSrc}
              alt="Digitaliza"
              style={{ width: "100%", height: "auto", borderRadius: "12px", boxShadow: "0 20px 40px rgba(0,0,0,0.1)", objectFit: "cover" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            style={{ flex: "1 1 min(100%, 350px)" }}
          >
            <h2 style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 700,
              color: "#2D2418",
              lineHeight: 1.05,
              margin: 0,
              whiteSpace: "pre-line",
              letterSpacing: "-0.02em",
              fontFamily: "'Space Grotesk', var(--font-space, sans-serif)"
            }}>
              {mainTitle}
            </h2>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Main page content
// ─────────────────────────────────────────────
function HomeContent() {
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
      {/* 🟢 LA SOLUCIÓN EXACTA PARA TU IMAGEN DE FONDO EN MÓVILES 🟢 */}
      <style>{`
        @media (max-width: 768px) {
          /* 1. Mantenemos el fondo del hero con un color por si la imagen es corta */
          .home-hero {
            background: linear-gradient(180deg, #1A120A 0%, #D45025 100%) !important;
          }

          /* 2. LA FOTO NO SE CORTA MÁS: Se ajusta al 100% del ancho del celular */
          .hero-bg-layer {
            background-size: 100% auto !important; /* Muestra todo el ancho de la imagen */
            background-position: top center !important; /* La pega en la parte de arriba */
            background-repeat: no-repeat !important; /* Evita que la foto se clone hacia abajo */
            inset: 0 !important; /* Desactiva el zoom de Framer Motion */
            transform: none !important; /* Desactiva el parallax que la deforma */
          }

          /* 3. Empujamos el texto debajo del dibujo de "econos" */
          .hero-bottom-layout {
            display: flex !important;
            flex-direction: column !important;
            justify-content: flex-end !important; /* Alinea el contenido abajo */
            padding-top: 80vw !important; /* Da un margen gigante arriba para que la foto se vea limpia */
            padding-bottom: 40px !important;
          }
          
          /* 4. El texto secundario se hace pequeño para no chocar */
          .hero-h1-split {
            font-size: clamp(2rem, 8vw, 3rem) !important;
            line-height: 1.1 !important;
            white-space: normal !important;
            word-wrap: break-word !important;
          }
          .hero-col-left, .hero-col-right {
            width: 100% !important;
            padding: 0 15px !important;
            text-align: left !important;
          }
          .hero-desc {
            font-size: 1.1rem !important;
          }

          /* Resto de ajustes del home (Gap y grillas) */
          .gap-layout {
            display: flex !important;
            flex-direction: column !important;
            padding: 20px !important;
            gap: 30px !important;
          }
          .gap-col-image, .gap-col-content {
            width: 100% !important;
          }
          .ramon-img {
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 4/3 !important;
            object-fit: cover !important;
            object-position: center top !important;
            border-radius: 16px !important;
          }
          .identity-grid, .results-layout {
            display: flex !important;
            flex-direction: column !important;
            gap: 30px !important;
          }
          .identity-left, .identity-right, .results-left, .results-right {
            width: 100% !important;
          }
        }
      `}</style>

      {/* ─── 1. HERO ─── */}
      <section ref={heroRef} className="home-hero" style={{ position: "relative", overflow: "hidden", minHeight: "100dvh", display: "flex", alignItems: "center" }}>

        {/* Usamos la clase hero-bg-layer para aplicarle nuestra regla del 100% auto en móvil */}
        <motion.div
          className="hero-bg-layer"
          style={{
            y: heroBgY,
            position: "absolute",
            inset: "-10% 0",
            backgroundImage: `url('${t("home.hero.bg")}')`,
            backgroundSize: "cover", // Esto se mantiene para PC, pero se sobrescribe en móvil
            backgroundPosition: "center center",
            zIndex: 0,
            filter: "brightness(1.6) saturate(1.1)"
          }}
        />

        <FloatingParticles />
        <motion.div className="container hero-bottom-layout" style={{ position: "relative", zIndex: 2, y: heroY, opacity: heroOpacity, width: "100%", height: "100%" }}>
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
      </section>

      {/* ─── 2. IDENTITY ─── */}
      <section className="home-section section-identity" style={{ position: "relative" }}>
        <div className="container">
          <RevealParent className="identity-grid" staggerDelay={0.2}>
            <div className="identity-left">
              <TextMask delay={0.2}><h2 className="big-title" dangerouslySetInnerHTML={{ __html: t("home.identity.title") }} style={{ margin: 0 }} /></TextMask>
            </div>
            <GradientRevealText className="identity-right"><p dangerouslySetInnerHTML={{ __html: t("home.identity.desc") }} /></GradientRevealText>
          </RevealParent>
          <GradientRevealText><p className="identity-hero-moved" dangerouslySetInnerHTML={{ __html: t("home.hero.title") }} /></GradientRevealText>
        </div>
      </section>

      {/* ─── 3. GAP (IMAGEN CON FLIP 3D) ─── */}
      <section className="home-section section-gap">
        <RevealParent className="container gap-layout">
          <RevealChild className="gap-col-image">
            <div className="gap-image-container" style={{ perspective: 1000 }}>
              <motion.img src="/assets/img/ramon.jpg" alt="Experto IA" className="ramon-img" initial={{ rotateY: 90, opacity: 0, scale: 0.8 }} whileInView={{ rotateY: 0, opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1.2, ease: "easeOut" }} style={{ transformStyle: "preserve-3d" }} />
            </div>
          </RevealChild>
          <div className="gap-col-content">
            <TextMask><h2 className="gap-title" dangerouslySetInnerHTML={{ __html: t("home.gap.title") }} style={{ margin: 0, paddingBottom: "20px" }} /></TextMask>
            <RevealParent className="gap-text-block" staggerDelay={0.15}>
              <RevealChild><p dangerouslySetInnerHTML={{ __html: t("home.gap.p1") }} /></RevealChild>
              <RevealChild><p dangerouslySetInnerHTML={{ __html: t("home.gap.p2") }} /></RevealChild>
              <RevealChild><p><span dangerouslySetInnerHTML={{ __html: t("home.gap.p3") }} /><br /><span className="gap-final-bold" dangerouslySetInnerHTML={{ __html: t("home.gap.p4") }} /></p></RevealChild>
            </RevealParent>
          </div>
        </RevealParent>
      </section>

      {/* ─── 4. ECOSYSTEM TEXT ─── */}
      <EcosystemTextIntro />

      {/* ─── 5. ECOSYSTEM CARDS ─── */}
      <EcosystemScroll />

      {/* ─── 6. RESULTS ─── */}
      <section className="home-section section-results">
        <RevealParent className="container results-layout">
          <div className="results-left"><TextMask delay={0.1}><h2 className="results-main-title" dangerouslySetInnerHTML={{ __html: t("home.results.title") }} style={{ margin: 0 }} /></TextMask></div>
          <div className="results-right">
            <RevealParent className="results-list" staggerDelay={0.12}>
              <RevealChild><li>{t("home.results.list1")}</li></RevealChild>
              <RevealChild><li>{t("home.results.list2")}</li></RevealChild>
              <RevealChild><li>{t("home.results.list3")}</li></RevealChild>
              <RevealChild><li>{t("home.results.list4")}</li></RevealChild>
              <RevealChild><li>{t("home.results.list5")}</li></RevealChild>
            </RevealParent>
            <RevealChild><p className="results-footer-text" dangerouslySetInnerHTML={{ __html: t("home.results.footer") }} style={{ marginTop: "30px" }} /></RevealChild>
          </div>
        </RevealParent>
      </section>

      {/* ─── 7. METHODOLOGY ─── */}
      <MethodologyScroll />

      {/* ─── 8. DIGITALIZA ─── */}
      <DigitizeSection />

      {/* ─── 9. CTA FINAL ─── */}
      <section ref={ctaRef} style={{
        position: "relative",
        padding: "clamp(80px, 10vw, 150px) 20px",
        display: "flex",
        justifyContent: "center", overflow: "hidden",
        backgroundImage: "url('/assets/img/fondo-contacto.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "clamp(400px, 50dvh, 600px)"
      }}>
        <motion.div
          style={{ position: "relative", zIndex: 10, maxWidth: "1000px", width: "100%", textAlign: "left", display: "flex", flexDirection: "column", justifyContent: "center" }}
          initial={{ opacity: 0, y: 50 }}
          animate={ctaView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 style={{ fontSize: "clamp(2rem, 5vw, 4rem)", color: "#fff", fontWeight: 400, lineHeight: 1.1, margin: "0 0 40px 0" }}>
            ¿Listo para digitalizar tu inmobiliaria?<br />
            <strong style={{ fontWeight: 800 }}>Hablemos hoy.</strong>
          </h2>
          <div>
            <Link href="/contacto" style={{
              display: "inline-block", background: "#fff", color: "#000",
              padding: "18px 40px", borderRadius: "8px", fontSize: "1rem",
              fontWeight: 600, textDecoration: "none", transition: "transform 0.3s ease"
            }}>
              Hablar con un Experto →
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) { return <main style={{ minHeight: "100vh", background: "transparent" }} />; }
  return <HomeContent />;
}