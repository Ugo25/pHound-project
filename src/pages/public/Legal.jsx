import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Legal.module.css';

const Legal = () => {
  const { t } = useTranslation('legal');

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{t('legal.title', 'Aviso Legal')}</h1>

        <div className={styles.toc}>
          <h3>{t('legal.toc_title', 'Secciones')}</h3>
          <ul>
            <li><a href="#info">1. Información del Titular</a></li>
            <li><a href="#marco">2. Marco Legal Mexicano</a></li>
            <li><a href="#disclosure">3. Divulgación Responsable</a></li>
            <li><a href="#etico">4. Mandato de Uso Ético</a></li>
            <li><a href="#responsabilidad">5. Exención de Responsabilidad</a></li>
            <li><a href="#propiedad">6. Propiedad Intelectual</a></li>
            <li><a href="#contacto">7. Contacto</a></li>
          </ul>
        </div>

        <section id="info" className={styles.section}>
          <h2>{t('legal.s1_title', '1. Información del Titular')}</h2>
          <p>{t('legal.s1_content', 'Este sitio web, pHound, es operado y mantenido por estudiantes de la Universidad Politécnica de Sinaloa (UPSIN) como parte de un proyecto educativo en ciberseguridad.')}</p>
        </section>

        <section id="marco" className={styles.section}>
          <h2>{t('legal.s2_title', '2. Marco Legal Mexicano')}</h2>
          <p>{t('legal.s2_content', 'Nuestras operaciones y los servicios prestados se adhieren a la legislación aplicable en los Estados Unidos Mexicanos, incluyendo, pero no limitado a:')}</p>
          <ul>
            <li>{t('legal.s2_item1', 'Código Penal Federal (Artículos 211 Bis 1 al 211 Bis 7 referentes a delitos informáticos).')}</li>
            <li>{t('legal.s2_item2', 'Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).')}</li>
            <li>{t('legal.s2_item3', 'Principios del Convenio de Budapest sobre Ciberdelincuencia.')}</li>
          </ul>
        </section>

        <section id="disclosure" className={styles.section}>
          <h2>{t('legal.s3_title', '3. Política de Divulgación Responsable')}</h2>
          <p>{t('legal.s3_content', 'En pHound promovemos la seguridad de la información. Si encuentra una vulnerabilidad en nuestra plataforma o durante el uso de nuestras herramientas en un objetivo autorizado, solicitamos que nos la reporte de manera privada a seguridad@phound.io para permitirnos resolver el problema antes de cualquier divulgación pública.')}</p>
        </section>

        <section id="etico" className={styles.section}>
          <h2>{t('legal.s4_title', '4. Mandato de Uso Ético')}</h2>
          <p>{t('legal.s4_content', 'Las herramientas proporcionadas por pHound están diseñadas EXCLUSIVAMENTE para auditorías autorizadas, investigación de seguridad y fines educativos. El usuario acepta explícitamente tener autorización por escrito para evaluar cualquier sistema, red o aplicación. El uso malicioso o no autorizado de esta plataforma está estrictamente prohibido.')}</p>
        </section>

        <section id="responsabilidad" className={styles.section}>
          <h2>{t('legal.s5_title', '5. Exención de Responsabilidad')}</h2>
          <p>{t('legal.s5_content', 'Los autores de pHound y la Universidad Politécnica de Sinaloa no asumen ninguna responsabilidad por el uso indebido de las herramientas aquí proporcionadas. Toda la responsabilidad recae en el usuario que ejecuta las herramientas y servicios asociados.')}</p>
        </section>

        <section id="propiedad" className={styles.section}>
          <h2>{t('legal.s6_title', '6. Aviso de Propiedad Intelectual')}</h2>
          <p>{t('legal.s6_content', 'Los nombres de productos, logotipos, marcas y otros signos distintivos son propiedad de sus respectivos titulares. pHound se reserva los derechos sobre la plataforma desarrollada, su código y los diseños propios.')}</p>
        </section>

        <section id="contacto" className={styles.section}>
          <h2>{t('legal.s7_title', '7. Contacto')}</h2>
          <p>{t('legal.s7_content', 'Para consultas de índole legal relativas a este aviso, por favor comuníquese a: ')}<a href="mailto:legal@phound.io">legal@phound.io</a></p>
        </section>
      </div>
    </div>
  );
};

export default Legal;
