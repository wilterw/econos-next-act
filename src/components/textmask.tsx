"use client";
import { motion } from "framer-motion";

export default function TextMask({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const animation = {
    initial: { y: "100%", opacity: 0 },
    enter: { 
      y: "0%", 
      opacity: 1, 
      transition: { 
        duration: 0.75, 
        // Le especificamos a TypeScript el tipo exacto de arreglo
        ease: [0.33, 1, 0.68, 1] as [number, number, number, number], 
        delay: delay 
      }
    }
  };

  return (
    <div style={{ overflow: "hidden", display: "inline-flex", verticalAlign: "bottom" }}>
      <motion.div variants={animation} initial="initial" whileInView="enter" viewport={{ once: true }}>
        {children}
      </motion.div>
    </div>
  );
}