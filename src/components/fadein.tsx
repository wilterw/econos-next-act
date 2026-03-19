"use client";
import { motion, Variants } from "framer-motion";
import React from "react";

// --- VARIANTE DE ANIMACIÓN (Lo que hace que se vea atractivo) ---
// Combina un movimiento hacia arriba con un efecto de desenfoque que se aclara.
const revealVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,      // Empieza 30px más abajo
    scale: 0.98, // Empieza un poco más pequeño
    filter: "blur(4px)" // Empieza borroso
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    filter: "blur(0px)", // Se enfoca
    transition: { 
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] // Curva de animación suave premium
    }
  }
};

// --- COMPONENTE PADRE (Envuelve una sección entera) ---
// Controla el "efecto cascada" (stagger) de sus hijos.
interface RevealParentProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number; // Tiempo entre la aparición de cada hijo
}

export const RevealParent = ({ children, className = "", staggerDelay = 0.15 }: RevealParentProps) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }} // Se activa cuando entra el 10% en pantalla
      transition={{ staggerChildren: staggerDelay }} // AQUÍ ESTÁ LA MAGIA DE LA CASCADA
    >
      {children}
    </motion.div>
  );
};

// --- COMPONENTE HIJO (Envuelve cada título, párrafo, tarjeta) ---
// Es el elemento individual que ejecuta la animación.
export const RevealChild = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div variants={revealVariants} className={className}>
      {children}
    </motion.div>
  );
};