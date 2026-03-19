"use client";
import { motion } from "framer-motion";

export default function Typewriter({ text, className = "" }: { text: string; className?: string }) {
  // Convertimos el texto en un array de caracteres
  const chars = Array.from(text);

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 } // 0.1 es la velocidad de tipeo
    }
  };

  const child = {
    hidden: { opacity: 0, display: "none" }, // Oculto y sin ocupar espacio
    visible: { opacity: 1, display: "inline-block" } // Aparece y empuja el texto
  };

  return (
    <motion.h1
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }} // "Sin repetición" como pediste
    >
      {chars.map((char, index) => (
        <motion.span key={index} variants={child}>
          {char === " " ? "\u00A0" : char} {/* Respeta los espacios en blanco */}
        </motion.span>
      ))}
    </motion.h1>
  );
}