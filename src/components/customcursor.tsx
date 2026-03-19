"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Blob sigue al cursor con spring‑lag para sensación líquida
    const blobX = useSpring(mouseX, { stiffness: 80, damping: 18, mass: 0.5 });
    const blobY = useSpring(mouseY, { stiffness: 80, damping: 18, mass: 0.5 });

    useEffect(() => {
        const update = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const addHover = () => setIsHovering(true);
        const removeHover = () => setIsHovering(false);

        window.addEventListener("mousemove", update);

        // Se activa en elementos interactivos
        const interactives = document.querySelectorAll("a, button, [data-cursor-hover]");
        interactives.forEach((el) => {
            el.addEventListener("mouseenter", addHover);
            el.addEventListener("mouseleave", removeHover);
        });

        return () => {
            window.removeEventListener("mousemove", update);
            interactives.forEach((el) => {
                el.removeEventListener("mouseenter", addHover);
                el.removeEventListener("mouseleave", removeHover);
            });
        };
    }, [isVisible, mouseX, mouseY]);

    return (
        <>
            {/* Punto central exacto */}
            <motion.div
                style={{
                    x: mouseX,
                    y: mouseY,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "#fff",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                    zIndex: 99999,
                    mixBlendMode: "difference",
                    opacity: isVisible ? 1 : 0,
                }}
            />

            {/* Blob grande con retraso */}
            <motion.div
                style={{
                    x: blobX,
                    y: blobY,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: isHovering ? "56px" : "36px",
                    height: isHovering ? "56px" : "36px",
                    borderRadius: "50%",
                    border: "1.5px solid rgba(255,255,255,0.6)",
                    transform: "translate(-50%, -50%)",
                    pointerEvents: "none",
                    zIndex: 99998,
                    mixBlendMode: "difference",
                    opacity: isVisible ? 1 : 0,
                    transition: "width 0.25s ease, height 0.25s ease, border-color 0.25s ease",
                    background: isHovering ? "rgba(255,255,255,0.08)" : "transparent",
                }}
            />

            {/* CSS para ocultar cursor nativo en desktop y cursor personalizado en touch */}
            <style jsx global>{`
        @media (pointer: fine) {
          *, *::before, *::after { cursor: none !important; }
        }
        @media (pointer: coarse) {
          .custom-cursor-dot, .custom-cursor-blob { display: none !important; }
        }
      `}</style>
        </>
    );
}
