import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Pricing.module.css';
import { Check } from 'lucide-react';

const Pricing = () => {
  const { t } = useTranslation('pricing');

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Planes y Precios</h1>
        <p className={styles.subtitle}>Escalable para individuos, equipos y empresas. Actualmente en desarrollo.</p>
      </header>

      <div className={styles.pricingGrid}>
        {/* Free Plan */}
        <div className={styles.card}>
          <div className={styles.badge}>Próximamente</div>
          <h2>Comunidad</h2>
          <div className={styles.price}>
            <span className={styles.currency}>$</span>
            <span className={styles.amount}>0</span>
            <span className={styles.period}>/mes</span>
          </div>
          <p className={styles.desc}>Perfecto para estudiantes e investigadores independientes.</p>
          <ul className={styles.features}>
            <li><Check size={16} className={styles.iconGreen} /> Escaneos limitados (10/mes)</li>
            <li><Check size={16} className={styles.iconGreen} /> Herramientas base (Nmap, Gobuster)</li>
            <li><Check size={16} className={styles.iconGreen} /> Formato JSON unificado</li>
            <li><Check size={16} className={styles.iconGreen} /> Soporte comunitario</li>
          </ul>
          <button className={styles.btnSecondary}>Unirse a lista de espera</button>
        </div>

        {/* Pro Plan */}
        <div className={`${styles.card} ${styles.cardPopular}`}>
          <div className={styles.badgePopular}>Recomendado</div>
          <h2>Profesional</h2>
          <div className={styles.price}>
            <span className={styles.currency}>$</span>
            <span className={styles.amount}>29</span>
            <span className={styles.period}>/mes</span>
          </div>
          <p className={styles.desc}>Para consultores y auditores independientes.</p>
          <ul className={styles.features}>
            <li><Check size={16} className={styles.iconCyan} /> Escaneos ilimitados</li>
            <li><Check size={16} className={styles.iconCyan} /> Todas las herramientas activas</li>
            <li><Check size={16} className={styles.iconCyan} /> Generación de reportes IA básicos</li>
            <li><Check size={16} className={styles.iconCyan} /> Acceso a la API REST</li>
          </ul>
          <button className={styles.btnPrimary}>Unirse a lista de espera</button>
        </div>

        {/* Enterprise Plan */}
        <div className={styles.card}>
          <div className={styles.badge}>Próximamente</div>
          <h2>Empresa</h2>
          <div className={styles.price}>
            <span className={styles.amountCustom}>Personalizado</span>
          </div>
          <p className={styles.desc}>Para equipos de seguridad y SOCs.</p>
          <ul className={styles.features}>
            <li><Check size={16} className={styles.iconPurple} /> Múltiples usuarios/roles</li>
            <li><Check size={16} className={styles.iconPurple} /> Reportes IA avanzados (White-label)</li>
            <li><Check size={16} className={styles.iconPurple} /> Integración SIEM/Webhooks</li>
            <li><Check size={16} className={styles.iconPurple} /> Soporte dedicado 24/7</li>
          </ul>
          <button className={styles.btnSecondary}>Contactar ventas</button>
        </div>
      </div>

      <section className={styles.faq}>
        <h2>Preguntas Frecuentes sobre Precios</h2>
        <div className={styles.faqGrid}>
          <div className={styles.faqItem}>
            <h3>¿pHound será Open Source?</h3>
            <p>Sí, el núcleo de orquestación y el esquema JSON serán Open Source bajo licencia MIT. Las características premium están orientadas a la IA avanzada y despliegue cloud.</p>
          </div>
          <div className={styles.faqItem}>
            <h3>¿Qué significa "Próximamente"?</h3>
            <p>Actualmente el proyecto está en fase de desarrollo académico en la UPSIN. Estamos evaluando la viabilidad de comercializar los servicios gestionados en el futuro.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
