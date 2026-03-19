"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "../../context/languagecontext";
import Magnetic from "../../components/magnetic";
import TextMask from "../../components/textmask";

// Variantes para los campos del formulario — aparecen uno a uno
const fieldVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.3 + i * 0.1,
    },
  }),
};

export default function Contacto() {
  const { t } = useLanguage();

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-5%" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mensaje enviado / Message sent");
  };

  return (
    <>
      <section
        className="contact-page-section"
        style={{
          backgroundImage: "url('/assets/img/fondo contacto.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Contenedor que entra desde abajo con spring */}
        <motion.div
          ref={sectionRef}
          className="container contact-container"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 65, damping: 18, mass: 1 }}
        >
          {/* ─── COLUMNA IZQUIERDA ─── */}
          <div className="contact-left">
            {/* Título principal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
            >
              <h1 className="contact-main-title">{t("contact.eyebrow")}</h1>
            </motion.div>

            {/* Subtítulo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
            >
              <p className="contact-subtitle" dangerouslySetInnerHTML={{ __html: t("contact.title") }} />
            </motion.div>

            {/* Botón Calendly con efecto pulse */}
            <motion.div
              style={{ marginTop: "40px" }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.35 }}
            >
              <Magnetic strength={0.35}>
                <a
                  href="https://calendly.com/tu-enlace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-red-meeting"
                  style={{ position: "relative", display: "inline-block" }}
                >
                  {t("contact.btn.meeting")} &rarr;
                </a>
              </Magnetic>
            </motion.div>
          </div>

          {/* ─── COLUMNA DERECHA: Formulario ─── */}
          <motion.div
            className="contact-right"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
          >
            <div className="minimal-form-wrapper">
              <span className="form-small-title">{t("contact.form.title")}</span>

              <form onSubmit={handleSubmit} className="minimal-form">
                {/* Los campos del form aparecen uno a uno con stagger */}
                {[
                  { type: "text", id: "name", placeholder: t("contact.form.name") },
                  { type: "email", id: "email", placeholder: t("contact.form.email") },
                  { type: "tel", id: "phone", placeholder: t("contact.form.phone") },
                ].map((field, i) => (
                  <motion.div
                    key={field.id}
                    className="minimal-group"
                    custom={i}
                    variants={fieldVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                  >
                    <input type={field.type} id={field.id} required placeholder={field.placeholder} />
                  </motion.div>
                ))}

                {/* Textarea */}
                <motion.div
                  className="minimal-group"
                  style={{ marginTop: "20px" }}
                  custom={3}
                  variants={fieldVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <span className="textarea-label">{t("contact.form.message")}</span>
                  <textarea id="message" rows={5} required />
                </motion.div>

                {/* Botón submit */}
                <motion.div
                  style={{ marginTop: "20px" }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.75, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <button type="submit" className="btn-white-submit">
                    {t("contact.form.submit")} &rarr;
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}