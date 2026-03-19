"use client";
import { ReactLenis } from "@studio-freight/react-lenis";
import React from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.1, 
        duration: 1.2, 
        smoothWheel: true,
        wheelMultiplier: 1, 
      }}
    >
      {/* Añadimos "as any" para saltar el conflicto de versiones de React */}
      {children as any}
    </ReactLenis>
  );
}