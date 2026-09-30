import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Docs.module.css';
import { Copy, Check, Terminal } from 'lucide-react';

const CodeBlock = ({ code, language = 'bash' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.codeWrapper}>
      <div className={styles.codeHeader}>
        <span className={styles.lang}>{language}</span>
        <button className={styles.copyBtn} onClick={handleCopy}>
          {copied ? <Check size={16} className={styles.iconGreen} /> : <Copy size={16} />}
        </button>
      </div>
      <pre className={styles.codeContent}>
        <code>{code}</code>
      </pre>
    </div>
  );
};

const Docs = () => {
  const { t } = useTranslation('docs');

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h3>Contenido</h3>
        <nav>
          <a href="#requisitos">Requisitos</a>
          <a href="#instalacion">Instalación</a>
          <a href="#configuracion">Configuración</a>
          <a href="#primer-escaneo">Primer Escaneo</a>
          <a href="#api">Referencia API</a>
        </nav>
      </aside>

      <main className={styles.content}>
        <h1 className={styles.title}>Documentación Oficial</h1>
        <p className={styles.intro}>
          Aprende a instalar, configurar y exprimir al máximo pHound.
        </p>

        <section id="requisitos" className={styles.section}>
          <h2>Requisitos Previos</h2>
          <ul>
            <li>Docker & Docker Compose instalados</li>
            <li>Git</li>
            <li>Al menos 4GB de RAM (8GB recomendados para IA local)</li>
            <li>Sistema basado en Linux (Ubuntu/Debian recomendado) o WSL2 en Windows</li>
          </ul>
        </section>

        <section id="instalacion" className={styles.section}>
          <h2>Instalación</h2>
          <p>Clona el repositorio oficial e inicia los contenedores:</p>
          <CodeBlock code={`git clone https://github.com/upsin-sec/phound.git
cd phound
docker-compose up -d`} />
        </section>

        <section id="configuracion" className={styles.section}>
          <h2>Configuración (Docker Compose)</h2>
          <p>El archivo <code>docker-compose.yml</code> por defecto expone los siguientes servicios:</p>
          <CodeBlock language="yaml" code={`version: '3.8'
services:
  api:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=db
      - JWT_SECRET=change_me

  scanner:
    build: ./scanner
    privileged: true # Requerido para escaneos SYN de Nmap

  frontend:
    build: ./frontend
    ports:
      - "80:80"`} />
        </section>

        <section id="primer-escaneo" className={styles.section}>
          <h2>Tu Primer Escaneo</h2>
          <p>Puedes interactuar con pHound a través del dashboard web en el puerto 80, o usando la CLI integrada en el contenedor del scanner:</p>
          <CodeBlock code={`docker exec -it phound_scanner sh
$ phound scan --target scanme.nmap.org --profile full`} />
          <div className={styles.alertBox}>
            <strong>Aviso Legal:</strong> Utiliza pHound únicamente en sistemas donde tengas permiso explícito para realizar auditorías.
          </div>
        </section>

        <section id="api" className={styles.section}>
          <h2>Referencia API</h2>
          <p>pHound expone una API RESTful en el puerto 3000. Autenticación mediante Bearer JWT.</p>
          
          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Método</th>
                  <th>Endpoint</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className={styles.methodGet}>GET</span></td>
                  <td><code>/api/scans</code></td>
                  <td>Lista todos los escaneos del usuario</td>
                </tr>
                <tr>
                  <td><span className={styles.methodPost}>POST</span></td>
                  <td><code>/api/scans</code></td>
                  <td>Inicia un nuevo escaneo</td>
                </tr>
                <tr>
                  <td><span className={styles.methodGet}>GET</span></td>
                  <td><code>/api/scans/:id/report</code></td>
                  <td>Descarga el reporte generado por IA</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Docs;
