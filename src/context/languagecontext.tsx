"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Pegamos tu diccionario exacto
const translations: Record<string, Record<string, string>> = {
  es: {
    "home.hero.bg": "/assets/img/hero-bg.jpg",
    "home.method.img": "/assets/img/seccion 1-4.jpg",
    "home.cta_digital.bg": "/assets/img/fondo-digital.jpg",
    "services.hero.img": "/assets/img/hero service.jpg",
    "about.hero.img": "/assets/img/hero nosotros.jpg",
    "about.section1.img": "/assets/img/quienes somos.jpg",
    "about.section2.img": "/assets/img/metodo.jpg",
    "about.section3.img": "/assets/img/porque.jpg",
    "header.home": "Inicio",
    "header.services": "Servicios",
    "header.about": "Nosotros",
    "header.contact": "Contacto",
    "footer.slogan": "Tu partner<br>tecnológico<br>inmobiliario",
    "footer.contactTitle": "Contacto",
    "footer.socialTitle": "Nuestras redes",
    "footer.rights": "2025 All Rights Reserved",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Use",
    "home.hero.tagline": "Tu partner tecnológico inmobiliario",
    "home.hero.title": "Digitalizamos tu inmobiliaria con IA para que cierres más ventas sin aumentar tu carga operativa.",
    "home.hero.desc": "Un equipo experto, cercano y resolutivo para que tu negocio avance más rápido y alcance a los competidores mas fuertes del mercado como grandes franquicias.",
    "home.hero.cta": "Hablar con un experto",
    "home.identity.title": "EXPERTOS.<br>CERCANOS.<br>RESOLUTIVOS.",
    "home.identity.desc": "En ECONOS combinamos tecnología,<br>automatización e inteligencia artificial con un<br>acompañamiento real y práctico. <strong>Nuestro</strong><br><strong>objetivo es simple: generar resultados</strong><br><strong>concretos en tu operación inmobiliaria.</strong>",
    "home.gap.title": "Acortamos la brecha tecnológica del sector inmobiliario",
    "home.gap.p1": "Las grandes franquicias cuentan con enormes equipos de IT que les dan una ventaja desproporcionada. Mientras, las inmobiliarias independientes han tenido que competir sin herramientas equivalentes.",
    "home.gap.p2": "En ECONOS equilibramos el juego: <strong>democratizamos tecnología avanzada para agencias pequeñas y medianas</strong>, permitiéndoles competir al mismo nivel.",
    "home.gap.p3": "Nuestras soluciones nacen de la <strong>colaboración real</strong> con inmobiliarias que viven el día a día del mercado, sus retos y la velocidad del avance digital.",
    "home.gap.p4": "Tecnología experta + Diseño personalizado + partner tecnológico = Resultados tangibles en tu negocio.",
    "home.eco.title": "El ecosistema Digital Estate IA",
    "home.eco.desc": "Tecnología diseñada para que tu inmobiliaria trabaje de forma ágil, profesional y eficiente.",
    "home.eco.card1.title": "Lead Keeper IA",
    "home.eco.card1.desc": "Atención automatizada, análisis de perfil y seguimiento activo.",
    "home.eco.card2.title": "Video Maker IA",
    "home.eco.card2.desc": "Videos profesionales optimizados para cada red social en minutos.",
    "home.eco.card3.title": "Social Media Manager IA",
    "home.eco.card3.desc": "Publicaciones diarias y campañas de pago automatizadas.",
    "home.eco.card4.title": "After-Sales IA",
    "home.eco.card4.desc": "Experiencia postventa impecable y fidelización del comprador.",
    "home.results.title": "Resultados<br>reales que<br>notarás desde<br>el primer mes",
    "home.results.list1": "Más visitas y más cierres.",
    "home.results.list2": "Menos tareas repetitivas.",
    "home.results.list3": "Presencia digital constante.",
    "home.results.list4": "Procesos más ordenados.",
    "home.results.list5": "Ahorro en tiempo y recursos.",
    "home.results.footer": "Somos resolutivos porque <strong>no dejamos puntos sueltos:</strong> todo queda automatizado.",
    "services.hero.eyebrow": "SERVICIOS",
    "services.hero.title": "DIGITAL ESTATE IA –<br>SOLUCIONES PARA<br>INMOBILIARIAS",
    "services.hero.desc": "Cada herramienta nace del trabajo<br>directo con agencias que viven el<br>mercado a pie de calle. No<br>hacemos software genérico:<br>hacemos soluciones que<br>resuelven problemas reales.",
    "services.card1.title": "Lead Keeper IA",
    "services.card1.desc": "Atención automatizada, análisis de perfil y seguimiento activo.",
    "services.card2.title": "Video Maker IA",
    "services.card2.desc": "Videos profesionales optimizados para cada red social en minutos.",
    "services.card3.title": "Social Media Manager IA",
    "services.card3.desc": "Publicaciones diarias y campañas de pago automatizadas.",
    "services.card4.title": "After-Sales IA",
    "services.card4.desc": "Experiencia postventa impecable y fidelización del comprador.",
    "services.corp.title": "SERVICIOS<br>CORPORATIVOS",
    "services.corp1.title": "Consultoría NIS2AI",
    "services.corp1.desc": "Cumplimiento, seguridad y gobernanza digital<br>para empresas que requieren estándares<br>europeos. Perfecto para agencias que gestionan<br>datos sensibles.",
    "services.corp2.title": "Ingeniería de sistemas a medida",
    "services.corp2.desc": "Desarrollo de soluciones personalizadas,<br>automatizaciones avanzadas y arquitecturas<br>escalables basados en iA. Cuando necesitas algo<br>único, lo construimos contigo.",
    "services.corp3.title": "Implementación de ecosistemas digitales",
    "services.corp3.desc": "CRM, VPS, servidores, integraciones y flujos<br>completos. Creamos tu infraestructura digital para<br>que funcione como un solo sistema cohesionado.<br>Por un entorno digital escalable y robusto y<br>seguro.",
    "about.intro.title": "QUIÉNES<br>SOMOS",
    "about.intro.desc": "Una empresa tecnológica especializada en digitalización Inmobiliaria. Combinamos experiencia real en el sector con una mentalidad resolutiva y práctica.",
    "about.mission.title": "Nuestra misión",
    "about.mission.desc": "Dotar de fuerza tecnológica a nuestros clientes para liderar el desarrollo digital y cerrar más ventas.",
    "about.reason.title": "Nuestra razón<br>de ser",
    "about.reason.desc": "Vimos cómo las grandes redes inmobiliarias avanzan gracias a enormes equipos de IT, mientras muchas agencias independientes quedan rezagadas sin culpa. ECONOS nace para acortar esa brecha: democratizamos tecnología avanzada para que cualquier inmobiliaria pueda competir de tú a tú con los grandes.",
    "about.method.title": "NUESTRO MÉTODO<br>(MÉTODO ECONOS)",
    "about.step1.title": "Comprender tu negocio",
    "about.step1.desc": "Escuchamos y analizamos con cercanía y claridad.",
    "about.step2.title": "Construir tu ecosistema",
    "about.step2.desc": "Creamos soluciones robustas adaptadas a tu realidad.",
    "about.step3.title": "Automatiza lo que importa", // Corregido el original
    "about.step3.desc": "Aplicamos IA  donde realmente genera impacto.",
    "about.step4.title": "Acompañarte mientras creces",
    "about.step4.desc": "Un equipo experto y resolutivo siempre disponible.",
    "about.trust.title": "Por qué confían<br>en nosotros",
    "about.trust.1": "Experiencia probada en el sector inmobiliario.",
    "about.trust.2": "Trato cercano y acompañamiento real.",
    "about.trust.3": "Soluciones resolutivas orientadas a resultados.",
    "about.trust.4": "Sin mediaciones ni comisiones ocultas.",
    "about.trust.5": "Integraciones personalizadas y opciones on-prem.",
    "about.trust.6": "Tecnología sólida, escalable y diseñada para crecer.",
    "home.cta_digital.line1": "¿Listo para digitalizar tu inmobiliaria?",
    "home.cta_digital.line2": "Hablemos hoy.",
    "home.cta_digital.btn": "Hablar con un Experto →",
    "contact.eyebrow": "CONTACTO",
    "contact.title": "Hablemos de digitalizar<br>tu inmobiliaria",
    "contact.btn.meeting": "Agendar reunión",
    "contact.form.title": "Formulario",
    "contact.form.name": "Nombre",
    "contact.form.email": "Email",
    "contact.form.phone": "Teléfono",
    "contact.form.message": "Mensaje",
    "contact.form.submit": "Enviar"
  },
  en: {
    "home.hero.bg": "/assets/img/hero-bg-en.jpg",
    "home.method.img": "/assets/img/seccion-en 1-4.jpg",
    "home.cta_digital.bg": "/assets/img/fondo-digital.jpg",
    "services.hero.img": "/assets/img/hero service en.jpg",
    "about.hero.img": "/assets/img/hero nosotros en.jpg",
    "about.section1.img": "/assets/img/quienes somos en.jpg",
    "about.section2.img": "/assets/img/metodo en.jpg",
    "about.section3.img": "/assets/img/porque en.jpg",
    "header.home": "Home",
    "header.services": "Services",
    "header.about": "About Us",
    "header.contact": "Contact",
    "footer.slogan": "Your<br>real estate<br>tech partner",
    "footer.contactTitle": "Contact",
    "footer.socialTitle": "Our Networks",
    "footer.rights": "2025 All Rights Reserved",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Use",
    "home.hero.tagline": "Your real estate tech partner",
    "home.hero.title": "We digitize your real estate agency with AI so you close more sales without increasing your workload.",
    "home.hero.desc": "An expert, close, and decisive team to help your business move faster and match the strongest competitors in the market, like major franchises.",
    "home.hero.cta": "Talk to an expert",
    "home.identity.title": "EXPERTS.<br>CLOSE.<br>DECISIVE.",
    "home.identity.desc": "At ECONOS we combine technology,<br>automation and AI with real support.<br><strong>Our goal is simple:</strong><br>generate concrete results for your real estate operation.",
    "home.gap.title": "We bridge the real estate technology gap",
    "home.gap.p1": "Large franchises have huge IT teams giving them a disproportionate advantage. Meanwhile, independent agencies have had to compete without equivalent tools.",
    "home.gap.p2": "At ECONOS we level the playing field: <strong>we democratize advanced technology for small and medium agencies</strong>, allowing them to compete at the same level.",
    "home.gap.p3": "Our solutions are born from <strong>real collaboration</strong> with real estate agencies living the day-to-day market, its challenges, and the speed of digital advancement.",
    "home.gap.p4": "Expert technology + Personalized design + Tech partner = Tangible results in your business.",
    "home.eco.title": "The Digital Estate AI Ecosystem",
    "home.eco.desc": "Technology designed for your real estate agency to work in an agile, professional, and efficient way.",
    "home.eco.card1.title": "Lead Keeper AI",
    "home.eco.card1.desc": "Automated attention, profile analysis, and active follow-up.",
    "home.eco.card2.title": "Video Maker AI",
    "home.eco.card2.desc": "Professional videos optimized for each social network in minutes.",
    "home.eco.card3.title": "Social Media Manager AI",
    "home.eco.card3.desc": "Daily posts and automated paid campaigns.",
    "home.eco.card4.title": "After-Sales AI",
    "home.eco.card4.desc": "Impeccable after-sales experience and buyer loyalty.",
    "home.results.title": "Real results you'll notice from month one",
    "home.results.list1": "More visits and more closings.",
    "home.results.list2": "Fewer repetitive tasks.",
    "home.results.list3": "Constant digital presence.",
    "home.results.list4": "More organized processes.",
    "home.results.list5": "Savings in time and resources.",
    "home.results.footer": "We are decisive because <strong>we leave no loose ends:</strong> everything is automated.",
    "services.hero.eyebrow": "SERVICES",
    "services.hero.title": "DIGITAL ESTATE AI –<br>SOLUTIONS FOR<br>REAL ESTATE",
    "services.hero.desc": "Every tool is born from direct<br>work with agencies living the<br>market on the ground. We don't<br>make generic software:<br>we make solutions<br>that solve real problems.",
    "services.card1.title": "Lead Keeper AI",
    "services.card1.desc": "Automated attention,<br>profile analysis, and<br>active follow-up.",
    "services.card2.title": "Video Maker AI",
    "services.card2.desc": "Professional videos<br>optimized for each<br>social network in minutes.",
    "services.card3.title": "Social Media Manager AI",
    "services.card3.desc": "Daily posts and<br>automated paid campaigns.",
    "services.card4.title": "After-Sales AI",
    "services.card4.desc": "Impeccable after-sales<br>experience and buyer<br>loyalty.",
    "services.corp.title": "CORPORATE<br>SERVICES",
    "services.corp1.title": "NIS2AI Consulting",
    "services.corp1.desc": "Compliance, security, and digital governance for<br>companies requiring strict standards. Perfect for<br>agencies managing sensitive data.",
    "services.corp2.title": "Custom Systems Engineering",
    "services.corp2.desc": "Development of personalized solutions,<br>advanced automations, and scalable AI-based<br>architectures. When you need something unique,<br>we build it with you.",
    "services.corp3.title": "Digital Ecosystem Implementation",
    "services.corp3.desc": "CRM, VPS, servers, integrations, and complete<br>workflows. We create your digital infrastructure<br>to work as a single cohesive system.<br>For a scalable, robust, and secure digital<br>environment.",
    "about.intro.title": "WHO<br>WE ARE",
    "about.intro.desc": "A technology company specialized in Real Estate digitalization. We combine real experience in the sector with a decisive and practical mindset.",
    "about.mission.title": "Our Mission",
    "about.mission.desc": "To empower our clients with technological strength to lead digital development and close more sales.",
    "about.reason.title": "Our Reason<br>for Being",
    "about.reason.desc": "We saw how large real estate networks advance thanks to huge IT teams, while many independent agencies are left behind through no fault of their own. ECONOS was born to bridge that gap: we democratize advanced technology so that any real estate agency can compete head-to-head with the big players.",
    "about.method.title": "OUR METHOD<br>(ECONOS METHOD)",
    "about.step1.title": "Understand your business",
    "about.step1.desc": "We listen and analyze with closeness and clarity.",
    "about.step2.title": "Build your ecosystem",
    "about.step2.desc": "We create robust solutions adapted to your reality.",
    "about.step3.title": "Automate what matters",
    "about.step3.desc": "We apply AI where it truly generates impact.",
    "about.step4.title": "Accompany you as you grow",
    "about.step4.desc": "An expert and decisive team always available.",
    "about.trust.title": "Why they trust<br>us",
    "about.trust.1": "Proven experience in the real estate sector.",
    "about.trust.2": "Close treatment and real support.",
    "about.trust.3": "Decisive solutions oriented to results.",
    "about.trust.4": "No hidden mediations or commissions.",
    "about.trust.5": "Custom integrations and on-prem options.",
    "about.trust.6": "Solid, scalable technology designed to grow.",
    "home.cta_digital.line1": "Ready to digitize your real estate agency?",
    "home.cta_digital.line2": "Let's talk today.",
    "home.cta_digital.btn": "Talk to an Expert →",
    "contact.eyebrow": "CONTACT",
    "contact.title": "Let's talk about digitizing<br>your real estate agency",
    "contact.btn.meeting": "Schedule a meeting",
    "contact.form.title": "Form",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.phone": "Phone",
    "contact.form.message": "Message",
    "contact.form.submit": "Send"
  }
};

type LanguageContextType = {
  language: string;
  toggleLanguage: (lang: string) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState("es");

  useEffect(() => {
    // Recupera el idioma guardado si el usuario recarga la página
    const savedLang = localStorage.getItem("econos_lang");
    if (savedLang) setLanguage(savedLang);
  }, []);

  const toggleLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("econos_lang", lang);
  };

  // Función traductora
  const t = (key: string) => {
    return translations[language][key] || key; // Si no encuentra la llave, muestra la llave como texto
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage debe ser usado dentro de LanguageProvider");
  return context;
};