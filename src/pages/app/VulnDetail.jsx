import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, ShieldAlert, Target, Server, Clock } from 'lucide-react';
import TerminalOutput from '../../components/app/TerminalOutput';
import styles from './VulnDetail.module.css';

const VulnDetail = () => {
  const { id } = useParams();
  const [status, setStatus] = useState('Open');

  // Mock data for the specific vulnerability
  const vuln = {
    cve: 'CVE-2024-1234',
    name: 'Unauthenticated Remote Code Execution',
    severity: 'Critical',
    cvss: 9.8,
    target: 'example.com',
    service: 'http (80/tcp)',
    date: '2026-09-28',
    description: 'A vulnerability in the web server allows unauthenticated attackers to execute arbitrary code with root privileges. The flaw exists due to improper input validation in the request handler.',
    evidence: `GET /api/v1/execute?cmd=whoami HTTP/1.1\nHost: example.com\n\nHTTP/1.1 200 OK\nContent-Type: text/plain\n\nroot`,
    remediation: [
      'Actualizar el servidor web a la versión 2.5.1 o superior.',
      'Implementar reglas de WAF para bloquear peticiones con caracteres anómalos en el parámetro cmd.',
      'Revisar los logs del servidor buscando indicadores de compromiso (IoCs).'
    ],
    references: [
      { name: 'NVD CVE-2024-1234', url: '#' },
      { name: 'Vendor Security Advisory', url: '#' }
    ]
  };

  const getCvssColor = (score) => {
    if (score >= 9.0) return 'var(--accent-red)';
    if (score >= 7.0) return '#ff7675';
    if (score >= 4.0) return 'var(--accent-orange)';
    if (score >= 0.1) return 'var(--accent-yellow)';
    return 'var(--accent-cyan)';
  };

  const cvssColor = getCvssColor(vuln.cvss);
  // Calculate stroke dasharray for circle progress
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (vuln.cvss / 10) * circumference;

  return (
    <div className={styles.container}>
      <Link to="/app/vulnerabilities" className={styles.backLink}>
        <ArrowLeft size={16} /> Volver a Vulnerabilidades
      </Link>

      <div className={styles.headerCard}>
        <div className={styles.headerMain}>
          <div className={styles.titleSection}>
            <div className={styles.badgeWrapper}>
              <span className={styles.severityBadge} style={{ backgroundColor: `${cvssColor}20`, color: cvssColor, border: `1px solid ${cvssColor}40` }}>
                {vuln.severity}
              </span>
              <select 
                className={styles.statusSelect} 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="Open">Estado: Abierta</option>
                <option value="In Progress">Estado: En Progreso</option>
                <option value="Fixed">Estado: Corregida</option>
                <option value="Accepted">Estado: Riesgo Aceptado</option>
              </select>
            </div>
            <h1 className={styles.title}>{vuln.cve}: {vuln.name}</h1>
          </div>
          
          <div className={styles.cvssVisual}>
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
              <circle 
                cx="50" cy="50" r={radius} 
                fill="none" 
                stroke={cvssColor} 
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 50 50)"
              />
              <text x="50" y="50" dominantBaseline="middle" textAnchor="middle" fill={cvssColor} fontSize="20" fontWeight="bold">
                {vuln.cvss}
              </text>
            </svg>
            <span className={styles.cvssLabel}>CVSS 3.1</span>
          </div>
        </div>

        <div className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <Target size={16} className={styles.metaIcon} />
            <div className={styles.metaContent}>
              <span className={styles.metaLabel}>Objetivo</span>
              <span className={styles.metaValueTarget}>{vuln.target}</span>
            </div>
          </div>
          <div className={styles.metaItem}>
            <Server size={16} className={styles.metaIcon} />
            <div className={styles.metaContent}>
              <span className={styles.metaLabel}>Servicio Afectado</span>
              <span className={styles.metaValue}>{vuln.service}</span>
            </div>
          </div>
          <div className={styles.metaItem}>
            <Clock size={16} className={styles.metaIcon} />
            <div className={styles.metaContent}>
              <span className={styles.metaLabel}>Fecha Detección</span>
              <span className={styles.metaValue}>{vuln.date}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentGrid}>
        <div className={styles.mainCol}>
          <div className={styles.section}>
            <h2>Descripción</h2>
            <p className={styles.text}>{vuln.description}</p>
          </div>

          <div className={styles.section}>
            <h2>Evidencia</h2>
            <TerminalOutput output={vuln.evidence} showLineNumbers={false} />
          </div>

          <div className={styles.section}>
            <h2>Remediación Sugerida</h2>
            <ul className={styles.remediationList}>
              {vuln.remediation.map((step, idx) => (
                <li key={idx}>
                  <div className={styles.stepNum}>{idx + 1}</div>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.sideCol}>
          <div className={styles.sideCard}>
            <h3>Referencias Externas</h3>
            <div className={styles.refList}>
              {vuln.references.map((ref, idx) => (
                <a key={idx} href={ref.url} className={styles.refLink} target="_blank" rel="noopener noreferrer">
                  {ref.name} <ExternalLink size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VulnDetail;
