"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useLanguage } from "../context/languagecontext";

const CARD_MAX_W = 1100;

interface Card {
    img: string;
    titleKey: string;
    descKey: string;
    accent: string;
}

const CARDS: Card[] = [
    { img: "/assets/img/leadkeeper.jpg", titleKey: "home.eco.card1.title", descKey: "home.eco.card1.desc", accent: "#4A1800" },
    { img: "/assets/img/videomaker.jpg", titleKey: "home.eco.card2.title", descKey: "home.eco.card2.desc", accent: "#001A3A" },
    { img: "/assets/img/smm.jpg", titleKey: "home.eco.card3.title", descKey: "home.eco.card3.desc", accent: "#1A0040" },
    { img: "/assets/img/after.jpg", titleKey: "home.eco.card4.title", descKey: "home.eco.card4.desc", accent: "#00301A" },
];

function SubEcosystemCard({ index, card, activeIndex, t }: { index: number, card: Card, activeIndex: number, t: any }) {
    // Aquí está la magia: ¿Es esta tarjeta la que debe estar activa en este momento?
    const isActive = index === activeIndex;

    return (
        <motion.div
            // Framer Motion anima automáticamente los cambios entre isActive true/false
            animate={{
                opacity: isActive ? 1 : 0,
                scale: isActive ? 1 : 0.85,
                zIndex: isActive ? 10 : 0
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} // Curva de animación súper suave y premium
            style={{
                position: "absolute", width: "100%", display: "flex", justifyContent: "center",
                pointerEvents: isActive ? "auto" : "none", // Si no está activa, no estorba
            }}
        >
            <div style={{
                width: "100%", maxWidth: CARD_MAX_W, borderRadius: "24px", overflow: "hidden",
                background: "#0A0A0C",
                boxShadow: "0 50px 100px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.1)"
            }}>
                <div style={{ display: "flex", flexWrap: "wrap", flexDirection: "row", width: "100%", minHeight: "500px" }}>
                    <div style={{ flex: "1.3 1 450px", position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, #0A0A0C 0%, rgba(10,10,12,0) 40%)", zIndex: 1 }}></div>
                        <img src={card.img} alt={t(card.titleKey)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        <span style={{ position: "absolute", bottom: 30, left: 40, fontSize: "6rem", fontWeight: 800, color: "rgba(255,255,255,0.15)", fontFamily: "var(--font-space)", lineHeight: 1, zIndex: 2 }}>
                            0{index + 1}
                        </span>
                    </div>
                    <div style={{ flex: "1 1 350px", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px", position: "relative" }}>
                        <span style={{ fontSize: "0.85rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-space)", marginBottom: 20, display: "block", fontWeight: 700 }}>
                            {t("home.eco.title") || "El ecosistema Digital"}
                        </span>
                        <h3 style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", fontWeight: 600, color: "#fff", margin: "0 0 25px 0", fontFamily: "var(--font-space)", lineHeight: 1.1 }}>
                            {t(card.titleKey)}
                        </h3>
                        <p style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.8)", lineHeight: 1.8, margin: 0 }} dangerouslySetInnerHTML={{ __html: t(card.descKey) }} />
                        <div style={{ width: 60, height: 4, background: card.accent, marginTop: 50, borderRadius: 2, boxShadow: `0 0 25px ${card.accent}` }} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default function EcosystemScroll({ hideTopFade = false, hideBottomFade = false, transparentBackground = false }: { hideTopFade?: boolean, hideBottomFade?: boolean, transparentBackground?: boolean } = {}) {
    const { t } = useLanguage();
    const mainRef = useRef<HTMLElement>(null);

    // El estado que controla cuál tarjeta se muestra (inicia en la 0)
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: mainRef,
        offset: ["start start", "end end"]
    });

    // Escuchamos el progreso del scroll y actualizamos la tarjeta activa
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (latest < 0.25) {
            setActiveIndex(0); // Del 0% al 25% del scroll: Lead Keeper
        } else if (latest >= 0.25 && latest < 0.50) {
            setActiveIndex(1); // Del 25% al 50%: Video Maker
        } else if (latest >= 0.50 && latest < 0.75) {
            setActiveIndex(2); // Del 50% al 75%: SMM
        } else {
            setActiveIndex(3); // Del 75% hasta el final (100%): After-Sales
        }
    });

    return (
        <section ref={mainRef} style={{
            position: "relative", width: "100%", display: "block",
            // Altura de 500vh: Da el espacio perfecto para que cada tarjeta respire
            // Y garantiza que la última tarjeta tenga una pantalla entera (100vh) para quedarse anclada
            height: "500vh",
            backgroundImage: transparentBackground ? "none" : "url('/assets/img/fondo-digital.jpg')",
            backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed",
            zIndex: 20
        }}>
            {/* Soft edge fade at the top to blend from cream background */}
            {!hideTopFade && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "150px", background: "linear-gradient(to bottom, #FDFBF7, transparent)", zIndex: 1, pointerEvents: "none" }} />}
            {/* Soft edge fade at the bottom to blend to cream background */}
            {!hideBottomFade && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "150px", background: "linear-gradient(to bottom, transparent, #FDFBF7)", zIndex: 1, pointerEvents: "none" }} />}

            <div style={{
                position: "sticky", top: 0, height: "100vh", width: "100%", overflow: "hidden",
                display: "flex", alignItems: "center", justifyContent: "center", padding: "0 20px"
            }}>
                {CARDS.map((card, i) => (
                    <SubEcosystemCard key={i} index={i} card={card} activeIndex={activeIndex} t={t} />
                ))}
            </div>
        </section>
    );
}