"use client";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 🔴 DEFINICIÓN DE TIEMPOS AJUSTADOS (MÁS LENTOS)
  const curtainSpeed = 1.2;    // Duración de subida/bajada de la cortina (elegante)
  const logoFadeSpeed = 0.8;   // Duración de aparición/desaparición del logo (suave)

  return (
    <>
      <AnimatePresence mode="wait">
        {/* Overlay curtain — DESLIZAMIENTO VERTICAL ELEGANTE */}
        <motion.div
          key={pathname + "-curtain"}
          initial={{ y: "0%" }}       // Inicia cubriendo la pantalla
          animate={{ y: "-100%" }}    // Sube elegantemente para revelar la página
          exit={{ y: "0%" }}          // Baja elegantemente para cubrir al cambiar de página
          transition={{ duration: curtainSpeed, ease: [0.76, 0, 0.24, 1] }} // Curva de velocidad "teatral" suave, sin delay
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "#000", // Negro absoluto
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            overflow: "hidden", // Asegura que no haya scrollbars durante la animación
          }}
        >
          {/* LOGO DE ECONOS — Aparece suavemente */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }} // Se mantiene visible mientras la cortina baja para cubrir
            transition={{ duration: logoFadeSpeed, ease: "easeOut" }}
            style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
          >
            {/* 🟢 IMAGEN DEL LOGO DE ECONOS (MÁS GRANDE) */}
            <img
              src="/assets/img/logo-econos.png"
              alt="ECONOS"
              style={{
                width: "clamp(250px, 35vw, 400px)", // Tamaño sustancialmente incrementado
                height: "auto",
                objectFit: "contain",
                backfaceVisibility: "hidden", // Suavizado para Webkit
              }}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Contenido de la página con fade sutil */}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.6 } }} // Espera a que la cortina esté subiendo
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}