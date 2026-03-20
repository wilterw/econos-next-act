"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useLanguage } from "../../context/languagecontext";

import Typewriter from "../../components/typewriter";
import Magnetic from "../../components/magnetic";
import TextMask from "../../components/textmask";
import EcosystemScroll from "../../components/ecosystemscroll";
import FadeInSection from "../../components/fadeinsection";

// ─────────────────────────────────────────────
// NUEVO COMPONENTE: SERVICIOS CORPORATIVOS (Scroll Vertical Editorial)
// ─────────────────────────────────────────────
const CORP_STEPS = [
  {
    num: "01",
    titleKey: "services.corp1.title",
    descKey: "services.corp1.desc",
    img: "/assets/img/col1.jpg",
    color: "#CC0000"
  },
  {
    num: "02",
    titleKey: "services.corp2.title",
    descKey: "services.corp2.desc",
    img: "/assets/img/col2.jpg",
    color: "#CC0000"
  },
  {
    num: "03",
    titleKey: "services.corp3.title",
    descKey: "services.corp3.desc",
    img: "/assets/img/col3.jpg",
    color: "#CC0000"
  }
];

function CorpCardVertical({ step, index, scrollYProgress, t }: { step: any, index: number, scrollYProgress: any, t: any }) {
  let inputRange: number[] = [];
  let yRangeNum: number[] = [];
  let opacityRange: number[] = [];

  // MATEMÁTICA DE SCROLL VERTICAL (De abajo hacia arriba)
  if (index === 0) {
    inputRange = [0, 0.15, 0.20, 0.40, 0.45, 1];
    yRangeNum = [50, 50, 0, 0, -50, -50]; // Entra de abajo (50vh), se centra (0), se va arriba (-50vh)
    opacityRange = [0, 0, 1, 1, 0, 0];
  }
  else if (index === 1) {
    inputRange = [0, 0.40, 0.45, 0.65, 0.70, 1];
    yRangeNum = [50, 50, 0, 0, -50, -50];
    opacityRange = [0, 0, 1, 1, 0, 0];
  }
  else {
    // Última tarjeta
    inputRange = [0, 0.65, 0.70, 1];
    yRangeNum = [50, 50, 0, 0];
    opacityRange = [0, 0, 1, 1];
  }

  const yOffset = useTransform(scrollYProgress, inputRange, yRangeNum);
  const y = useTransform(yOffset, (val) => `${val}vh`);
  const opacity = useTransform(scrollYProgress, inputRange, opacityRange);
  const display = useTransform(opacity, (o) => (o > 0.01 ? "flex" : "none"));

  return (
    <motion.div
      className="corp-card-wrapper"
      style={{
        position: "absolute", width: "100%", height: "100%",
        display, y, opacity, zIndex: 10 - index,
        alignItems: "center", justifyContent: "center"
      }}
    >
      <div className="corp-card-content" style={{
        display: "flex", alignItems: "center", width: "100%", maxWidth: "1000px", padding: "0 20px", gap: "60px"
      }}>
        {/* LADO IZQUIERDO: Número Gigante */}
        <div className="corp-card-num" style={{ flex: "0 0 auto" }}>
          <span style={{
            fontSize: "clamp(8rem, 15vw, 15rem)", fontWeight: 800, color: step.color,
            lineHeight: 0.8, fontFamily: "var(--font-space)", letterSpacing: "-0.05em"
          }}>
            {step.num}
          </span>
        </div>

        {/* LADO DERECHO: Contenido y Foto */}
        <div className="corp-card-text" style={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}>
          <h3
            style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 700, color: "#0A0A0C", margin: "0 0 20px 0", lineHeight: 1.1, fontFamily: "var(--font-space)", letterSpacing: "-0.02em" }}
            dangerouslySetInnerHTML={{ __html: t(step.titleKey) }}
          />

          {/* Línea divisoria sutil para el toque editorial */}
          <div style={{ width: "100%", height: "1px", background: "rgba(0,0,0,0.1)", marginBottom: "20px" }} />

          <p
            style={{ fontSize: "1.2rem", color: "#2D2418", margin: "0 0 30px 0", lineHeight: 1.6, fontWeight: 500 }}
            dangerouslySetInnerHTML={{ __html: t(step.descKey) }}
          />

          <div className="corp-card-img" style={{ width: "100%", maxWidth: "450px", aspectRatio: "16/9", borderRadius: "12px", overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.08)" }}>
            <img src={step.img} alt={t(step.titleKey)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CorpServicesScroll() {
  const { t } = useLanguage();
  const mainRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: mainRef, offset: ["start start", "end end"] });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Matemáticas para el título inicial (Se va hacia arriba)
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15, 0.20], [1, 1, 0]);
  const titleYOffset = useTransform(scrollYProgress, [0, 0.15, 0.20], [0, 0, -50]);
  const titleY = useTransform(titleYOffset, (val) => `${val}vh`);
  const titleDisplay = useTransform(titleOpacity, (o) => (o > 0.01 ? "block" : "none"));

  const rawTitle = t("services.corp.title");
  const titleLines = typeof rawTitle === "string" ? rawTitle.split(/<br\s*\/?>/i) : ["SERVICIOS CORPORATIVOS"];
  const wordVariant = { hidden: { opacity: 0, display: "none" }, visible: { opacity: 1, display: "inline-block" } };

  return (
    <>
      <style>{`
        /* Altura por defecto para PC */
        .corp-scroll-section { height: 400vh; }
        
        /* 🟢 REGLAS CSS PARA MANTENER LA ANIMACIÓN PERO QUE QUEPA EN MÓVIL 🟢 */
        @media (max-width: 768px) {
          /* 1. Reducir drásticamente el tiempo de scroll (2 pantallas en vez de 4) */
          .corp-scroll-section { height: 200vh !important; }
          .corp-sticky-box { height: 100dvh !important; }
          
          /* 2. Ajustar posición del título para que no choque con la primera tarjeta */
          .corp-main-title { top: 15% !important; padding: 0 20px !important; }
          .corp-main-title h2 { font-size: 2rem !important; }
          
          /* 3. Reorganizar la tarjeta: Apilada, centrada y compacta */
          .corp-card-content { 
            flex-direction: column !important; 
            gap: 10px !important; 
            align-items: flex-start !important; 
            margin-top: 15vh; /* Bajamos el bloque para que respire con el header */
          }
          
          /* 4. Miniaturizar elementos para que quepan en la pantalla */
          .corp-card-num span { font-size: 4rem !important; line-height: 0.9 !important; display: block; margin-bottom: 0px; }
          .corp-card-text h3 { font-size: 1.5rem !important; margin-bottom: 8px !important; }
          .corp-card-text p { font-size: 1rem !important; margin-bottom: 12px !important; line-height: 1.4 !important; }
          
          /* 5. La imagen asume el resto del espacio sin desbordar */
          .corp-card-img { 
            max-width: 100% !important; 
            max-height: 25vh !important; /* Limita la altura para que no empuje el contenido hacia abajo */
            margin-top: 5px !important; 
          }
        }
      `}</style>

      <section ref={mainRef} className="corp-scroll-section" style={{
        position: "relative", width: "100%",
        backgroundColor: "transparent", // Fondo transparente para fluir con el diseño
        zIndex: 30
      }}>
        {/* 🟢 El height de este contenedor se controla ahora desde el CSS */}
        <div className="corp-sticky-box" style={{
          position: "sticky", top: 0, height: "100vh", width: "100%", overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>

          {/* TÍTULO INICIAL: Entra normal y se va hacia arriba */}
          <motion.div className="corp-main-title" style={{ position: "absolute", opacity: titleOpacity, y: titleY, display: titleDisplay, textAlign: "center", zIndex: 10 }}>
            <motion.h2
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}
              variants={{ hidden: { opacity: 1 }, visible: { transition: { staggerChildren: 0.05 } } }}
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 800, color: "#0A0A0C", margin: 0, textTransform: "uppercase", letterSpacing: "1px", lineHeight: 1.1, fontFamily: "var(--font-space)" }}
            >
              {titleLines.map((line, lineIndex) => (
                <div key={lineIndex}>
                  {Array.from(line.replace(/<[^>]*>?/gm, '')).map((char, index) => (
                    <motion.span key={index} variants={wordVariant}>{char === " " ? "\u00A0" : char}</motion.span>
                  ))}
                </div>
              ))}
            </motion.h2>
          </motion.div>

          {/* TARJETAS VERTICALES: Suben desde abajo conservando la magia */}
          {isMounted && CORP_STEPS.map((step, i) => (
            <CorpCardVertical key={i} index={i} step={step} scrollYProgress={scrollYProgress} t={t} />
          ))}

        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE CONTENT
// ─────────────────────────────────────────────
function ServiciosContent() {
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
      {/* ─── 1. HERO con parallax real del fondo ─── */}
      <section ref={heroRef} className="banner-hero-section" style={{ position: "relative", overflow: "hidden" }}>
        <motion.div
          style={{
            y: heroBgY,
            position: "absolute",
            inset: "-10% 0",
            backgroundImage: "url('/assets/img/hero service.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
            filter: "brightness(1.6) saturate(1.1)"
          }}
        />
        <motion.div className="container" style={{ position: "relative", zIndex: 2, y: heroY, opacity: heroOpacity, display: "flex", justifyContent: "flex-start", alignItems: "center", height: "100%", marginTop: "-25vh" }}>
          <Typewriter text={t("services.hero.eyebrow")} className="banner-hero-title" />
        </motion.div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "150px", background: "linear-gradient(to bottom, transparent, #FDFBF7)", zIndex: 3, pointerEvents: "none" }} />
      </section>

      {/* ─── 2. INTRODUCCIÓN ─── */}
      <FadeInSection>
        <section className="services-main-section section-pad-btm" style={{ position: "relative", overflow: "hidden" }}>
          <div className="container">
            <div className="services-intro-layout">
              <div className="intro-col-left" style={{ overflow: "hidden", paddingBottom: "10px" }}>
                <motion.h1
                  className="intro-title"
                  initial={{ y: 120, rotate: 6, opacity: 0 }}
                  whileInView={{ y: 0, rotate: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.1, ease: [0.25, 1, 0.35, 1] }}
                  dangerouslySetInnerHTML={{ __html: t("services.hero.title") }}
                  style={{ margin: 0, transformOrigin: "left bottom" }}
                />
              </div>
              <div className="intro-col-right">
                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.1, delay: 0.15, ease: [0.25, 1, 0.35, 1] }}
                  className="intro-desc"
                  dangerouslySetInnerHTML={{ __html: t("services.hero.desc") }}
                  style={{ color: "#2D2418", fontWeight: 500 }}
                />
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ─── 3. ECOSISTEMA DIGITAL ─── */}
      <FadeInSection>
        <EcosystemScroll />
      </FadeInSection>

      {/* ─── 4. SERVICIOS CORPORATIVOS (Scroll Vertical Tipo Lista) ─── */}
      <FadeInSection>
        <CorpServicesScroll />
      </FadeInSection>

      {/* ─── 5. CTA FINAL ─── */}
      <FadeInSection>
        <section
          className="home-section section-digital-cta"
          style={{ backgroundImage: `url(${t("home.cta_digital.bg")})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}
        >
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

export default function Servicios() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <main style={{ minHeight: "100vh", background: "transparent" }} />;
  return <ServiciosContent />;
}