"use client";
import Link from 'next/link';
import { useLanguage } from '../context/languagecontext';

export default function Footer() {
  const { t } = useLanguage(); // Extraemos la función de traducción

  return (
    <footer id="global-footer">
      <div className="footer-wrapper">

        {/* COLUMNA 1: Slogan y Logo */}
        <div className="footer-col col-1">
          {/* Usamos dangerouslySetInnerHTML para que lea los <br> de la traducción */}
          <h2 className="footer-tagline" dangerouslySetInnerHTML={{ __html: t("footer.slogan") }} />
          <div className="footer-bottom-element">
            <img
              src="/assets/img/logo-econos-blanco.png"
              alt="ECONOS"
              className="footer-logo"
            />
          </div>
        </div>

        {/* COLUMNA 2: Contacto */}
        <div className="footer-col col-2">
          <div className="top-content">
            <h3 className="footer-label">{t("footer.contactTitle")}</h3>
            <div className="underlined-links">
              <a href="tel:+34652436599" className="link-item">+34 652 436 599</a>
              <a href="mailto:info@econos.io" className="link-item">info@econos.io</a>
            </div>
          </div>

          <div className="footer-bottom-element">
            <p className="copyright">{t("footer.rights")}</p>
          </div>
        </div>

        {/* COLUMNA 3: Redes y Legales */}
        <div className="footer-col col-3">
          <div className="top-content">
            <h4 className="footer-label">{t("footer.socialTitle")}</h4>
            <div className="underlined-links">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="link-item">Instagram</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="link-item">Linkedin</a>
            </div>
          </div>

          <div className="footer-bottom-element">
            <div className="legal-links">
              <Link href="#" className="link-item">{t("footer.privacy")}</Link>
              <Link href="#" className="link-item">{t("footer.terms")}</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}