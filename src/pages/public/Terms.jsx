import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Terms.module.css';

const Terms = () => {
  const { t } = useTranslation('legal');

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{t('terms.title', 'Términos y Condiciones de Uso')}</h1>
        <p className={styles.lastUpdated}>{t('terms.last_updated', 'Última actualización: Octubre 2023')}</p>

        <div className={styles.toc}>
          <h3>{t('terms.toc_title', 'Tabla de Contenido')}</h3>
          <ul>
            <li><a href="#definiciones">1. Definiciones</a></li>
            <li><a href="#aceptacion">2. Aceptación de los Términos</a></li>
            <li><a href="#servicio">3. Descripción del Servicio</a></li>
            <li><a href="#cuenta">4. Registro y Seguridad de la Cuenta</a></li>
            <li><a href="#uso">5. Uso Permitido y Prohibido</a></li>
            <li><a href="#propiedad">6. Propiedad Intelectual</a></li>
            <li><a href="#responsabilidad">7. Limitación de Responsabilidad</a></li>
            <li><a href="#indemnizacion">8. Indemnización</a></li>
            <li><a href="#ley">9. Ley Aplicable y Jurisdicción</a></li>
            <li><a href="#contacto">10. Contacto</a></li>
          </ul>
        </div>

        <section id="definiciones" className={styles.section}>
          <h2>{t('terms.s1_title', '1. Definiciones')}</h2>
          <p>{t('terms.s1_content', 'Para efectos de estos Términos, "Servicio" se refiere a la plataforma pHound. "Usuario" es cualquier individuo que acceda o utilice el Servicio.')}</p>
        </section>

        <section id="aceptacion" className={styles.section}>
          <h2>{t('terms.s2_title', '2. Aceptación de los Términos')}</h2>
          <p>{t('terms.s2_content', 'Al registrarse y utilizar pHound, usted acepta estar sujeto a estos Términos y Condiciones.')}</p>
        </section>

        <section id="servicio" className={styles.section}>
          <h2>{t('terms.s3_title', '3. Descripción del Servicio')}</h2>
          <p>{t('terms.s3_content', 'pHound provee herramientas de escaneo y auditoría de ciberseguridad, así como reportes asistidos por IA.')}</p>
        </section>

        <section id="cuenta" className={styles.section}>
          <h2>{t('terms.s4_title', '4. Registro y Seguridad de la Cuenta')}</h2>
          <p>{t('terms.s4_content', 'El usuario es responsable de mantener la confidencialidad de sus credenciales. Toda actividad bajo su cuenta es su responsabilidad.')}</p>
        </section>

        <section id="uso" className={styles.section}>
          <h2>{t('terms.s5_title', '5. Uso Permitido y Prohibido (CRÍTICO)')}</h2>
          <p>{t('terms.s5_content', 'El usuario DEBE contar con autorización POR ESCRITO para escanear cualquier objetivo. El uso no autorizado de estas herramientas está estrictamente prohibido y puede constituir un delito bajo el Código Penal Federal de México (Artículos 211 Bis 1 al 211 Bis 7). Solo se permite el uso ético y autorizado.')}</p>
        </section>

        <section id="propiedad" className={styles.section}>
          <h2>{t('terms.s6_title', '6. Propiedad Intelectual')}</h2>
          <p>{t('terms.s6_content', 'Todos los derechos de propiedad intelectual del Servicio, su código, diseño y marca pertenecen al Proyecto pHound.')}</p>
        </section>

        <section id="responsabilidad" className={styles.section}>
          <h2>{t('terms.s7_title', '7. Limitación de Responsabilidad')}</h2>
          <p>{t('terms.s7_content', 'La plataforma se proporciona "tal cual". pHound no es responsable de daños directos, indirectos o incidentales resultantes del uso o la incapacidad de usar el Servicio. El usuario asume toda responsabilidad técnica y legal de sus escaneos.')}</p>
        </section>

        <section id="indemnizacion" className={styles.section}>
          <h2>{t('terms.s8_title', '8. Indemnización')}</h2>
          <p>{t('terms.s8_content', 'Usted acepta indemnizar y eximir de responsabilidad a pHound y a la UPSIN frente a cualquier reclamo derivado del mal uso del Servicio.')}</p>
        </section>

        <section id="ley" className={styles.section}>
          <h2>{t('terms.s9_title', '9. Ley Aplicable y Jurisdicción')}</h2>
          <p>{t('terms.s9_content', 'Estos términos se rigen por las leyes de México. Para cualquier disputa, el usuario se somete a la jurisdicción de los tribunales de Mazatlán, Sinaloa.')}</p>
        </section>

        <section id="contacto" className={styles.section}>
          <h2>{t('terms.s10_title', '10. Contacto')}</h2>
          <p>{t('terms.s10_content', 'Para cuestiones legales: ')}<a href="mailto:legal@phound.io">legal@phound.io</a></p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
