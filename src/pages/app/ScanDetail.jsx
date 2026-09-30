import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShieldAlert, Server, FolderTree, FileCode, CheckCircle, Clock, Target, AlertTriangle } from 'lucide-react';
import TerminalOutput from '../../components/app/TerminalOutput';
import styles from './ScanDetail.module.css';

const ScanDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('puertos');

  const mockPorts = [
    { port: 21, state: 'open', service: 'ftp', version: 'vsftpd 3.0.3', protocol: 'tcp' },
    { port: 22, state: 'open', service: 'ssh', version: 'OpenSSH 8.2p1', protocol: 'tcp' },
    { port: 80, state: 'open', service: 'http', version: 'Apache httpd 2.4.41', protocol: 'tcp' },
    { port: 443, state: 'open', service: 'https', version: 'nginx 1.18.0', protocol: 'tcp' },
    { port: 3306, state: 'filtered', service: 'mysql', version: '-', protocol: 'tcp' }
  ];

  const mockVulns = [
    { id: 'CVE-2021-3156', name: 'Sudo Baron Samedit', severity: 'Critical' },
    { id: 'CVE-2023-23397', name: 'Outlook EoP', severity: 'High' },
    { id: 'Weak SSH Config', name: 'CBC Ciphers Enabled', severity: 'Medium' }
  ];

  const mockRawOutput = `Starting Nmap 7.93 ( https://nmap.org ) at 2026-09-29 10:00 UTC
Nmap scan report for example.com (93.184.216.34)
Host is up (0.012s latency).
Not shown: 996 closed tcp ports (reset)
PORT     STATE    SERVICE VERSION
21/tcp   open     ftp     vsftpd 3.0.3
22/tcp   open     ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)
80/tcp   open     http    Apache httpd 2.4.41 ((Ubuntu))
443/tcp  open     https   nginx 1.18.0 (Ubuntu)
3306/tcp filtered mysql
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Nmap done: 1 IP address (1 host up) scanned in 12.45 seconds`;

  const tabs = [
    { id: 'puertos', label: 'Puertos' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'directorios', label: 'Directorios' },
    { id: 'vulns', label: 'Vulnerabilidades' },
    { id: 'raw', label: 'Raw Output' },
    { id: 'json', label: 'JSON' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.headerCard}>
        <div className={styles.headerMain}>
          <h1 className={styles.title}>Resultados del Escaneo</h1>
          <span className={styles.statusBadge}>Completado</span>
        </div>
        
        <div className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <Target size={16} className={styles.metaIcon} />
            <div className={styles.metaContent}>
              <span className={styles.metaLabel}>Objetivo</span>
              <span className={styles.metaValueTarget}>example.com</span>
            </div>
          </div>
          <div className={styles.metaItem}>
            <CheckCircle size={16} className={styles.metaIcon} />
            <div className={styles.metaContent}>
              <span className={styles.metaLabel}>Tipo</span>
              <span className={styles.metaValue}>Full Audit</span>
            </div>
          </div>
          <div className={styles.metaItem}>
            <Clock size={16} className={styles.metaIcon} />
            <div className={styles.metaContent}>
              <span className={styles.metaLabel}>Duración</span>
              <span className={styles.metaValue}>12m 45s</span>
            </div>
          </div>
          <div className={styles.metaItem}>
            <AlertTriangle size={16} className={styles.metaIcon} />
            <div className={styles.metaContent}>
              <span className={styles.metaLabel}>Vulnerabilidades</span>
              <span className={styles.metaValueDanger}>3 Encontradas</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.tabsContainer}>
        <div className={styles.tabList}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`${styles.tabBtn} ${activeTab === tab.id ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={styles.tabContent}>
          {activeTab === 'puertos' && (
            <div className={styles.tableResponsive}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Puerto</th>
                    <th>Protocolo</th>
                    <th>Estado</th>
                    <th>Servicio</th>
                    <th>Versión</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPorts.map((p, i) => (
                    <tr key={i}>
                      <td className={styles.portCell}>{p.port}</td>
                      <td>{p.protocol.toUpperCase()}</td>
                      <td>
                        <span className={`${styles.stateBadge} ${styles[p.state]}`}>
                          {p.state}
                        </span>
                      </td>
                      <td>{p.service}</td>
                      <td className={styles.versionCell}>{p.version}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'raw' && (
            <TerminalOutput output={mockRawOutput} />
          )}
          
          {activeTab === 'json' && (
            <div className={styles.jsonViewer}>
              <pre>
                <span className={styles.jsonKey}>"target":</span> <span className={styles.jsonString}>"example.com"</span>,<br/>
                <span className={styles.jsonKey}>"status":</span> <span className={styles.jsonString}>"completed"</span>,<br/>
                <span className={styles.jsonKey}>"ports":</span> [ ... ]
              </pre>
            </div>
          )}
          
          {['servicios', 'directorios', 'vulns'].includes(activeTab) && (
            <div className={styles.placeholderContent}>
              <Server size={48} className={styles.placeholderIcon} />
              <h3>Contenido de {tabs.find(t => t.id === activeTab).label}</h3>
              <p>Datos simulados para la pestaña seleccionada.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanDetail;
