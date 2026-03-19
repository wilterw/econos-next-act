"use client";
import React, { useEffect, useRef, useState } from "react";

interface FadeInSectionProps {
  children: React.ReactNode;
}

export default function FadeInSection({ children }: FadeInSectionProps) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            // Si quieres que solo se anime una vez al hacer scroll hacia abajo, 
            // descomenta la siguiente línea para dejar de observar una vez visible:
            // observer.unobserve(entry.target);
          } else {
            // Si quieres que el efecto se repita al subir y bajar,
            // debes setear false cuando ya no está intersecting.
            setVisible(false);
          }
        });
      },
      {
        threshold: 0.05, // Se activa cuando el 5% del elemento es visible
      }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
    >
      {children}
    </div>
  );
}
