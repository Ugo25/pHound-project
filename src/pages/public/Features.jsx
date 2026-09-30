import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Features.module.css';
import { Globe, Scan, FileJson, Brain, Container, Table } from 'lucide-react';

const Features = () => {
  const { t } = useTranslation('features');

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <h1 className={styles.title}>{t('hero.title', 'Características')}</h1>
        <p className={styles.subtitle}>
          {t('hero.subtitle', 'Descubre el poder de una suite de auditoría completamente integrada.')}
        </p>
      </header>

      <div className={styles.featuresList}>
        {/* OSINT */}
        <section className={styles.featureRow}>
          <div className={styles.featureContent}>
            <Globe className={styles.iconCyan} size={48} />
            <h2>OSINT Pasivo</h2>
            <p>Recolección de inteligencia de fuentes abiertas sin interactuar directamente con el objetivo. Minimiza la huella y descubre la superficie de ataque.</p>
            <ul>
              <li>Resolución de DNS y subdominios</li>
              <li>Información WHOIS</li>
              <li>Geolocalización de IPs</li>
              <li>Descubrimiento de correos expuestos</li>
            </ul>
          </div>
          <div className={styles.featureVisual}>
            <div className={styles.mockTerminal}>
              <div className={styles.termHeader}>osint-module</div>
              <div className={styles.termBody}>
                &gt; Resolviendo objetivo: example.com<br/>
                [+] IP: 192.168.1.1 (Geo: US)<br/>
                [+] Subdominios encontrados: 12<br/>
                [+] Registros MX: mail.example.com
              </div>
            </div>
          </div>
        </section>

        {/* Escaneo Activo */}
        <section className={`${styles.featureRow} ${styles.rowReverse}`}>
          <div className={styles.featureContent}>
            <Scan className={styles.iconRed} size={48} />
            <h2>Escaneo Activo Integrado</h2>
            <p>Ejecución orquestada de herramientas estándar de la industria. pHound maneja los parámetros óptimos para cada situación.</p>
            <ul>
              <li>Nmap para descubrimiento de puertos y servicios</li>
              <li>Gobuster para fuzzing de directorios</li>
              <li>Nikto para vulnerabilidades web</li>
            </ul>
          </div>
          <div className={styles.featureVisual}>
            <div className={styles.toolGrid}>
              <div className={styles.toolBadge}>Nmap</div>
              <div className={styles.toolBadge}>Gobuster</div>
              <div className={styles.toolBadge}>Nikto</div>
            </div>
          </div>
        </section>

        {/* JSON Unificado */}
        <section className={styles.featureRow}>
          <div className={styles.featureContent}>
            <FileJson className={styles.iconYellow} size={48} />
            <h2>Esquema JSON Unificado</h2>
            <p>El núcleo de la interoperabilidad de pHound. Todas las herramientas arrojan sus resultados en un formato único, facilitando el análisis programático.</p>
            <ul>
              <li>Elimina formatos propietarios (XML, TXT, HTML)</li>
              <li>Estructura jerárquica por host y puerto</li>
              <li>Fácil integración con SIEMs</li>
            </ul>
          </div>
          <div className={styles.featureVisual}>
            <pre className={styles.codeBlock}>
{`{
  "target": "example.com",
  "vulnerabilities": [
    {
      "tool": "nikto",
      "severity": "high",
      "description": "Outdated Apache"
    }
  ]
}`}
            </pre>
          </div>
        </section>

        {/* IA */}
        <section className={`${styles.featureRow} ${styles.rowReverse}`}>
          <div className={styles.featureContent}>
            <Brain className={styles.iconPurple} size={48} />
            <h2>Reportes IA</h2>
            <p>Correlación de vulnerabilidades y redacción ejecutiva mediante Modelos de Lenguaje Grandes (LLMs).</p>
            <ul>
              <li>Traducción de jerga técnica a impacto de negocio</li>
              <li>Sugerencias de remediación personalizadas</li>
              <li>Generación automática de PDFs</li>
            </ul>
          </div>
          <div className={styles.featureVisual}>
            <div className={styles.aiMock}>
              <div className={styles.aiBubble}>Detectada versión vulnerable de Apache en el puerto 80 y un directorio /admin expuesto.</div>
              <div className={styles.aiBubbleResult}>Impacto Crítico: Posible acceso no autorizado al panel de administración. Se recomienda actualizar Apache y restringir acceso a /admin.</div>
            </div>
          </div>
        </section>

        {/* Docker */}
        <section className={styles.featureRow}>
          <div className={styles.featureContent}>
            <Container className={styles.iconGreen} size={48} />
            <h2>Arquitectura Docker</h2>
            <p>Despliegue sin fricción y aislamiento total. No ensucies tu sistema host con dependencias de herramientas de hacking.</p>
            <ul>
              <li>Microservicios independientes</li>
              <li>Actualizaciones automáticas de herramientas</li>
              <li>Escalabilidad horizontal</li>
            </ul>
          </div>
          <div className={styles.featureVisual}>
            <div className={styles.dockerGrid}>
              <div className={styles.dockerContainer}>Frontend</div>
              <div className={styles.dockerContainer}>API Node</div>
              <div className={styles.dockerContainer}>Scanner Engine</div>
              <div className={styles.dockerContainer}>Database</div>
            </div>
          </div>
        </section>
      </div>

      <section className={styles.comparisonTable}>
        <div className={styles.tableHeader}>
          <Table className={styles.iconCyan} size={32} />
          <h2>Comparativa de Formatos</h2>
        </div>
        <div className={styles.tableWrapper}>
          <table>
            <thead>
              <tr>
                <th>Herramienta</th>
                <th>Formato Nativo</th>
                <th>Salida en pHound</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Nmap</td>
                <td>XML, Grepable, Normal</td>
                <td className={styles.highlight}>JSON Estandarizado</td>
              </tr>
              <tr>
                <td>Metasploit</td>
                <td>Base de datos propia</td>
                <td className={styles.highlight}>JSON Estandarizado</td>
              </tr>
              <tr>
                <td>Nikto</td>
                <td>TXT, HTML, CSV</td>
                <td className={styles.highlight}>JSON Estandarizado</td>
              </tr>
              <tr>
                <td>Gobuster</td>
                <td>TXT</td>
                <td className={styles.highlight}>JSON Estandarizado</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Features;
