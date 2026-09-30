import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './FAQ.module.css';
import { Search } from 'lucide-react';

const FAQ = () => {
  const { t } = useTranslation('faq');
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      category: 'General',
      q: '¿Qué es pHound?',
      a: 'pHound es una suite integral de auditoría de ciberseguridad que unifica OSINT, escaneo activo y generación de reportes asistida por Inteligencia Artificial en una arquitectura Dockerizada.'
    },
    {
      category: 'General',
      q: '¿Es legal usar pHound?',
      a: 'pHound es una herramienta. Su uso es legal siempre y cuando tengas permiso explícito y por escrito del propietario de la infraestructura que estás auditando. No nos hacemos responsables del mal uso.'
    },
    {
      category: 'Técnico',
      q: '¿Qué herramientas incluye el escaneo activo?',
      a: 'Actualmente integramos Nmap (para puertos y servicios), Gobuster (para enumeración de directorios) y Nikto (para vulnerabilidades web comunes). Los resultados se normalizan en un único archivo JSON.'
    },
    {
      category: 'Técnico',
      q: '¿En qué se diferencia de Kali Linux?',
      a: 'Kali Linux es un sistema operativo completo con cientos de herramientas dispares. pHound es una plataforma web y de orquestación que automatiza el flujo de trabajo de auditoría (ejecución -> recolección -> análisis IA -> reporte) en contenedores Docker.'
    },
    {
      category: 'IA',
      q: '¿Cómo funciona la generación de reportes IA?',
      a: 'Tomamos el JSON unificado de todas las herramientas y lo inyectamos como contexto en un LLM (modelo de lenguaje). El modelo está instruido para identificar falsos positivos, correlacionar hallazgos (ej. puerto abierto + directorio sensible) y redactar un reporte en formato PDF ejecutivo.'
    },
    {
      category: 'IA',
      q: '¿Mis datos de escaneo se envían a OpenAI o terceros?',
      a: 'Depende de tu configuración. En el plan gratuito y pro se utilizan APIs en la nube. Sin embargo, la arquitectura permite configurar un LLM local (como Ollama) para asegurar que ningún dato de tus auditorías salga de tu servidor.'
    },
    {
      category: 'Requisitos',
      q: '¿Necesito ser un hacker experto para usarlo?',
      a: 'No. pHound está diseñado para democratizar la ciberseguridad. La interfaz abstrae la complejidad de los comandos, haciéndola accesible para desarrolladores, sysadmins e ingenieros de software, aunque se recomienda conocimiento básico de redes.'
    },
    {
      category: 'Requisitos',
      q: '¿Funciona en Windows?',
      a: 'Sí, gracias a Docker. Puedes ejecutar pHound en Windows utilizando Docker Desktop con backend WSL2, macOS, o cualquier distribución Linux.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Preguntas Frecuentes</h1>
        <p className={styles.subtitle}>Resuelve tus dudas sobre la plataforma, seguridad y casos de uso.</p>
        
        <div className={styles.searchBar}>
          <Search className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Buscar pregunta..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </header>

      <div className={styles.faqList}>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <details key={index} className={styles.details}>
              <summary className={styles.summary}>
                {faq.q}
                <span className={styles.category}>{faq.category}</span>
              </summary>
              <div className={styles.content}>
                <p>{faq.a}</p>
              </div>
            </details>
          ))
        ) : (
          <div className={styles.noResults}>
            No se encontraron resultados para "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
};

export default FAQ;
