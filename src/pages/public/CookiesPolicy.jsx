import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './CookiesPolicy.module.css';

const CookiesPolicy = () => {
  const { t } = useTranslation('legal');

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{t('cookies.title', 'Política de Cookies')}</h1>
        <p className={styles.lastUpdated}>{t('cookies.last_updated', 'Última actualización: Octubre 2023')}</p>

        <section className={styles.section}>
          <h2>{t('cookies.s1_title', '1. ¿Qué son las cookies?')}</h2>
          <p>{t('cookies.s1_content', 'Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo para recordar sus preferencias y mejorar la experiencia de usuario.')}</p>
        </section>

        <section className={styles.section}>
          <h2>{t('cookies.s2_title', '2. Tipos de Cookies que Utilizamos')}</h2>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{t('cookies.table_cookie', 'Cookie')}</th>
                  <th>{t('cookies.table_type', 'Tipo')}</th>
                  <th>{t('cookies.table_duration', 'Duración')}</th>
                  <th>{t('cookies.table_purpose', 'Propósito')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>phound_session</td>
                  <td>{t('cookies.type_essential', 'Esencial')}</td>
                  <td>{t('cookies.duration_session', 'Sesión')}</td>
                  <td>{t('cookies.purpose_session', 'Gestión de sesión y autenticación')}</td>
                </tr>
                <tr>
                  <td>phound_lang</td>
                  <td>{t('cookies.type_preference', 'Preferencia')}</td>
                  <td>{t('cookies.duration_1year', '1 año')}</td>
                  <td>{t('cookies.purpose_lang', 'Recordar preferencia de idioma')}</td>
                </tr>
                <tr>
                  <td>phound_consent</td>
                  <td>{t('cookies.type_essential', 'Esencial')}</td>
                  <td>{t('cookies.duration_1year', '1 año')}</td>
                  <td>{t('cookies.purpose_consent', 'Almacenar estado de consentimiento')}</td>
                </tr>
                <tr>
                  <td>phound_theme</td>
                  <td>{t('cookies.type_preference', 'Preferencia')}</td>
                  <td>{t('cookies.duration_1year', '1 año')}</td>
                  <td>{t('cookies.purpose_theme', 'Recordar preferencia de tema visual')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.section}>
          <h2>{t('cookies.s3_title', '3. Cómo gestionar las cookies')}</h2>
          <p>{t('cookies.s3_content', 'Puede gestionar y/o eliminar las cookies de su dispositivo configurando su navegador:')}</p>
          <ul>
            <li><strong>Google Chrome:</strong> Configuración &gt; Privacidad y seguridad &gt; Cookies.</li>
            <li><strong>Mozilla Firefox:</strong> Opciones &gt; Privacidad y seguridad &gt; Cookies y datos del sitio.</li>
            <li><strong>Safari:</strong> Preferencias &gt; Privacidad &gt; Administrar datos del sitio web.</li>
            <li><strong>Microsoft Edge:</strong> Configuración &gt; Privacidad, búsqueda y servicios &gt; Borrar datos de exploración.</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>{t('cookies.s4_title', '4. Consecuencias de deshabilitar las cookies')}</h2>
          <p>{t('cookies.s4_content', 'Si deshabilita las cookies esenciales, es posible que ciertas funciones de la plataforma (como mantener la sesión iniciada) no funcionen correctamente.')}</p>
        </section>

        <section className={styles.section}>
          <h2>{t('cookies.s5_title', '5. Contacto')}</h2>
          <p>{t('cookies.s5_content', 'Para dudas sobre nuestra política de cookies: ')}<a href="mailto:privacidad@phound.io">privacidad@phound.io</a></p>
        </section>
      </div>
    </div>
  );
};

export default CookiesPolicy;
