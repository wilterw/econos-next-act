"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../context/languagecontext";

const STEPS = [
    {
        num: "01",
        titleKey: "about.step1.title",
        descKey: "about.step1.desc",
        img: "/assets/img/grafico-analisis.jpg",
        color: "#CC0000"
    },
    {
        num: "02",
        titleKey: "about.step2.title",
        descKey: "about.step2.desc",
        img: "/assets/img/diagrama-ecosistema.jpg",
        color: "#CC0000"
    },
    {
        num: "03",
        titleKey: "about.step3.title",
        descKey: "about.step3.desc",
        img: "/assets/img/circuito-automatizacion.jpg",
        color: "#CC0000"
    },
    {
        num: "04",
        titleKey: "about.step4.title",
        descKey: "about.step4.desc",
        img: "/assets/img/equipo-soporte.jpg",
        color: "#CC0000"
    },
];

function MethodCard({ step, index, scrollYProgress, t }: { step: any, index: number, scrollYProgress: any, t: any }) {
    let inputRange: number[] = [];
    let xRangeNum: number[] = [];
    let opacityRange: number[] = [];
    let skewRange: number[] = [];

    // Matemáticas de deslizamiento horizontal (Se mantienen intactas)
    if (index === 0) {
        inputRange = [0, 0.20, 0.25, 1];
        xRangeNum = [0, 0, 100, 100];
        opacityRange = [1, 1, 0, 0];
        skewRange = [0, 0, -15, 0];
    }
    else if (index === 1) {
        inputRange = [0, 0.20, 0.25, 0.45, 0.50, 1];
        xRangeNum = [100, 100, 0, 0, 100, 100];
        opacityRange = [0, 0, 1, 1, 0, 0];
        skewRange = [0, 15, 0, 0, -15, 0];
    }
    else if (index === 2) {
        inputRange = [0, 0.45, 0.50, 0.70, 0.75, 1];
        xRangeNum = [100, 100, 0, 0, 100, 100];
        opacityRange = [0, 0, 1, 1, 0, 0];
        skewRange = [0, 15, 0, 0, -15, 0];
    }
    else {
        inputRange = [0, 0.70, 0.75, 1];
        xRangeNum = [100, 100, 0, 0];
        opacityRange = [0, 0, 1, 1];
        skewRange = [0, 15, 0, 0];
    }

    const xOffset = useTransform(scrollYProgress, inputRange, xRangeNum);
    const x = useTransform(xOffset, (val) => `${val}vw`);
    const opacity = useTransform(scrollYProgress, inputRange, opacityRange);
    const skewX = useTransform(scrollYProgress, inputRange, skewRange);

    const display = useTransform(opacity, (o) => (o > 0.05 ? "flex" : "none"));

    return (
        <motion.div
            style={{
                position: "absolute", width: "100%", justifyContent: "center",
                display, x, opacity, skewX, zIndex: 10 - index
            }}
        >
            <div className="method-card-inner">
                <div className="method-image-box">
                    <img src={step.img} alt={t(step.titleKey)} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(204,0,0,0.1) 0%, transparent 100%)", pointerEvents: "none" }} />
                </div>

                <div className="method-text-box">
                    <span className="method-num" style={{ color: step.color }}>
                        {step.num}
                    </span>
                    <h3
                        className="method-title"
                        dangerouslySetInnerHTML={{ __html: t(step.titleKey) }}
                    />
                    <p
                        className="method-desc"
                        dangerouslySetInnerHTML={{ __html: t(step.descKey) }}
                    />
                </div>
            </div>
        </motion.div>
    );
}

export default function MethodologyScroll() {
    const { t } = useLanguage();
    const mainRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: mainRef, offset: ["start start", "end end"] });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const interval = setInterval(() => window.dispatchEvent(new Event("resize")), 500);
        setTimeout(() => clearInterval(interval), 2000);
        return () => clearInterval(interval);
    }, []);

    const rawMethodTitle = typeof t("about.method.title") === "string" ? t("about.method.title") : "NUESTRO MÉTODO<br>(MÉTODO ECONOS)";
    const parts = rawMethodTitle.split("<br>");
    const titleStr = parts[0] || "NUESTRO MÉTODO";
    const subtitleStr = parts[1] || "(MÉTODO ECONOS)";

    const wordVariant = {
        hidden: { opacity: 0, display: "none" },
        visible: { opacity: 1, display: "inline-block" }
    };

    return (
        <>
            {/* CSS INYECTADO PARA RESPONSIVE EN MÓVILES */}
            <style>{`
                .method-card-inner {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    max-width: 900px;
                    background: rgba(20, 20, 25, 0.85);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 32px;
                    padding: 30px 50px 30px 30px;
                    box-shadow: 0 30px 60px rgba(0,0,0,0.5);
                    gap: 50px;
                    margin: 0 20px;
                }
                .method-image-box {
                    width: 380px;
                    flex-shrink: 0;
                    aspect-ratio: 16/9;
                    border-radius: 20px;
                    overflow: hidden;
                    background: #000;
                    border: 2px solid rgba(255,255,255,0.1);
                    position: relative;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                }
                .method-text-box {
                    display: flex;
                    flex-direction: column;
                }
                .method-num {
                    font-size: 5rem;
                    font-weight: 800;
                    line-height: 0.8;
                    font-family: var(--font-space);
                    margin-bottom: 10px;
                }
                .method-title {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: #fff;
                    margin: 0 0 15px 0;
                    line-height: 1.1;
                }
                .method-desc {
                    font-size: 1.2rem;
                    color: rgba(255,255,255,0.7);
                    margin: 0;
                    line-height: 1.5;
                }

                /* MAGIA PARA MÓVILES (Cambio a diseño vertical) */
                @media (max-width: 768px) {
                    .method-card-inner {
                        flex-direction: column; /* Apila imagen arriba, texto abajo */
                        padding: 25px 20px;
                        gap: 20px;
                        border-radius: 24px;
                    }
                    .method-image-box {
                        width: 100%; /* La imagen ya no tiene 380px, ocupa el 100% del contenedor */
                        aspect-ratio: auto;
                        height: 200px; /* Le damos una altura fija pero segura */
                    }
                    .method-text-box {
                        align-items: flex-start;
                        text-align: left;
                    }
                    .method-num { font-size: 3.5rem; }
                    .method-title { font-size: 1.8rem; }
                    .method-desc { font-size: 1rem; }
                }
            `}</style>

            <section ref={mainRef} style={{
                position: "relative", width: "100%",
                height: "500vh",
                backgroundColor: "transparent",
                zIndex: 30
            }}>
                {/* 100dvh permite que funcione perfecto quitando la barra en móviles */}
                <div style={{
                    position: "sticky", top: 0, height: "100dvh", width: "100%", overflow: "hidden",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
                }}>
                    <div style={{ position: "absolute", top: "clamp(60px, 12%, 15%)", textAlign: "center", zIndex: 10, padding: "0 20px" }}>
                        <motion.h2
                            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}
                            variants={{ hidden: { opacity: 1 }, visible: { transition: { staggerChildren: 0.05 } } }}
                            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, color: "#0A0A0C", margin: 0, textTransform: "uppercase", letterSpacing: "2px" }}
                        >
                            {Array.from(titleStr).map((char, index) => (
                                <motion.span key={index} variants={wordVariant}>{char === " " ? "\u00A0" : char}</motion.span>
                            ))}
                        </motion.h2>

                        {subtitleStr && (
                            <motion.p
                                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }}
                                variants={{ hidden: { opacity: 1 }, visible: { transition: { staggerChildren: 0.05, delayChildren: 0.8 } } }}
                                style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)", color: "#CC0000", margin: "10px 0 0 0", fontFamily: "var(--font-space)", fontWeight: 700 }}
                            >
                                {Array.from(subtitleStr).map((char, index) => (
                                    <motion.span key={index} variants={wordVariant}>{char === " " ? "\u00A0" : char}</motion.span>
                                ))}
                            </motion.p>
                        )}
                    </div>

                    <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", flex: 1, paddingTop: "clamp(80px, 15vh, 120px)" }}>
                        {isMounted && STEPS.map((step, i) => (
                            <MethodCard key={i} index={i} step={step} scrollYProgress={scrollYProgress} t={t} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}