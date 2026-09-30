import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Privacy.module.css';

const Privacy = () => {
  const { t } = useTranslation('legal');

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{t('privacy.title', 'Política de Privacidad')}</h1>
        <p className={styles.lastUpdated}>{t('privacy.last_updated', 'Última actualización: Octubre 2023')}</p>

        <div className={styles.toc}>
          <h3>{t('privacy.toc_title', 'Tabla de Contenido')}</h3>
          <ul>
            <li><a href="#identidad">1. Identidad y Domicilio del Responsable</a></li>
            <li><a href="#datos">2. Datos Personales Recabados</a></li>
            <li><a href="#finalidades">3. Finalidades del Tratamiento</a></li>
            <li><a href="#transferencias">4. Transferencias de Datos</a></li>
            <li><a href="#arco">5. Derechos ARCO</a></li>
            <li><a href="#cookies">6. Uso de Cookies</a></li>
            <li><a href="#cambios">7. Cambios a la Política</a></li>
          </ul>
        </div>

        <section id="identidad" className={styles.section}>
          <h2>{t('privacy.s1_title', '1. Identidad y Domicilio del Responsable')}</h2>
          <p>{t('privacy.s1_content', 'pHound, desarrollado por estudiantes de la Universidad Politécnica de Sinaloa (UPSIN), con domicilio en Mazatlán, Sinaloa, México, es responsable del tratamiento y protección de sus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).')}</p>
        </section>

        <section id="datos" className={styles.section}>
          <h2>{t('privacy.s2_title', '2. Datos Personales Recabados')}</h2>
          <p>{t('privacy.s2_content', 'Para las finalidades señaladas, recabamos: nombre, correo electrónico, dirección IP, registros de uso (logs), y resultados de escaneos autorizados.')}</p>
        </section>

        <section id="finalidades" className={styles.section}>
          <h2>{t('privacy.s3_title', '3. Finalidades del Tratamiento')}</h2>
          <p>{t('privacy.s3_primary', 'Finalidades Primarias: Proveer el servicio de plataforma de auditoría, autenticación de usuarios, ejecución de escaneos y generación de reportes.')}</p>
          <p>{t('privacy.s3_secondary', 'Finalidades Secundarias: Analítica de uso, mejora del servicio y envío de comunicaciones relacionadas con pHound.')}</p>
        </section>

        <section id="transferencias" className={styles.section}>
          <h2>{t('privacy.s4_title', '4. Transferencias de Datos')}</h2>
          <p>{t('privacy.s4_content', 'Sus datos pueden ser transferidos a terceros como la API de OpenAI (exclusivamente para generación de reportes asistidos por IA). No realizamos transferencias internacionales de datos personales que contravengan la normativa vigente.')}</p>
        </section>

        <section id="arco" className={styles.section}>
          <h2>{t('privacy.s5_title', '5. Derechos ARCO')}</h2>
          <p>{t('privacy.s5_content', 'Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos. Para ejercer estos derechos, envíe un correo electrónico a ')}<a href="mailto:privacidad@phound.io">privacidad@phound.io</a>{t('privacy.s5_content2', ' con su solicitud detallada.')}</p>
        </section>

        <section id="cookies" className={styles.section}>
          <h2>{t('privacy.s6_title', '6. Uso de Cookies')}</h2>
          <p>{t('privacy.s6_content', 'Utilizamos cookies propias y de terceros para mejorar su experiencia. Puede consultar nuestra ')}<a href="/cookies">Política de Cookies</a>{t('privacy.s6_content2', ' para más información.')}</p>
        </section>

        <section id="cambios" className={styles.section}>
          <h2>{t('privacy.s7_title', '7. Cambios a la Política')}</h2>
          <p>{t('privacy.s7_content', 'Cualquier modificación a esta Política de Privacidad será notificada a través de nuestro sitio web o correo electrónico registrado.')}</p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
