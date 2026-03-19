"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "../context/languagecontext";

export default function Header() {
  const { language, toggleLanguage, t } = useLanguage();

  // Estado para el menú móvil (hamburguesa)
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Función para cerrar el menú al hacer clic en un enlace
  const closeMenu = () => setIsMobileOpen(false);

  // Estado para detectar si se ha scrolleado más allá de un umbral
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Si scrolleamos más de 100px, ocultamos el logo
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Escuchar el evento de scroll
    window.addEventListener("scroll", handleScroll);

    // Limpiar el event listener al desmontar el componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header id="global-header">
      <div className="header-container">

        {/* LOGO */}
        <div 
          className="logo-container"
          style={{
            opacity: isScrolled ? 0 : 1,
            visibility: isScrolled ? "hidden" : "visible",
            pointerEvents: isScrolled ? "none" : "auto",
            transition: "opacity 0.4s ease, visibility 0.4s ease",
          }}
        >
          <Link href="/" onClick={closeMenu}>
            <img src="/assets/img/logo-econos-blanco.png" alt="ECONOS Logo" className="logo-img" />
          </Link>
        </div>

        {/* NAVEGACIÓN */}
        <div className={`nav-container ${isMobileOpen ? 'open' : ''}`}>
          <nav className="main-nav">
            <ul>
              <li><Link href="/" onClick={closeMenu}>{t("header.home")}</Link></li>
              <li><Link href="/servicios" onClick={closeMenu}>{t("header.services")}</Link></li>
              <li><Link href="/nosotros" onClick={closeMenu}>{t("header.about")}</Link></li>
              <li><Link href="/contacto" onClick={closeMenu}>{t("header.contact")}</Link></li>
            </ul>
          </nav>

          {/* SELECTOR DE IDIOMAS */}
          <div className="lang-selector">
            <button
              className={`lang-link ${language === 'es' ? 'active' : ''}`}
              onClick={() => { toggleLanguage('es'); closeMenu(); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit', padding: 0 }}
            >
              Es
            </button>
            <span className="separator">|</span>
            <button
              className={`lang-link ${language === 'en' ? 'active' : ''}`}
              onClick={() => { toggleLanguage('en'); closeMenu(); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', font: 'inherit', padding: 0 }}
            >
              En
            </button>
          </div>

          {/* BOTÓN HAMBURGUESA MÓVIL */}
          <div className="mobile-toggle" onClick={() => setIsMobileOpen(!isMobileOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
}