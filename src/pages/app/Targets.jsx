import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search, ShieldAlert, Network, Calendar, Play, Globe } from 'lucide-react';
import styles from './Targets.module.css';

const mockTargets = [
  { id: 1, name: 'example.com', type: 'domain', risk: 'high', lastScan: '2026-09-28', ports: 4, vulns: 3 },
  { id: 2, name: '192.168.1.100', type: 'ip', risk: 'medium', lastScan: '2026-09-29', ports: 12, vulns: 1 },
  { id: 3, name: 'api.corp.local', type: 'domain', risk: 'low', lastScan: '2026-09-20', ports: 2, vulns: 0 },
  { id: 4, name: '10.0.0.0/24', type: 'network', risk: 'high', lastScan: '2026-09-25', ports: 45, vulns: 12 },
  { id: 5, name: 'staging.app', type: 'domain', risk: 'info', lastScan: 'Nunca', ports: '-', vulns: '-' },
];

const Targets = () => {
  const { t } = useTranslation('targets');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const getRiskColor = (risk) => {
    switch(risk) {
      case 'high': return 'var(--accent-red)';
      case 'medium': return 'var(--accent-orange)';
      case 'low': return 'var(--accent-yellow)';
      case 'info': return 'var(--accent-cyan)';
      default: return 'var(--text-secondary)';
    }
  };

  const getRiskLabel = (risk) => {
    switch(risk) {
      case 'high': return 'Alto Riesgo';
      case 'medium': return 'Riesgo Medio';
      case 'low': return 'Bajo Riesgo';
      case 'info': return 'Info / No Escaneado';
      default: return 'Desconocido';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gestión de Objetivos</h1>
        <button className={styles.addBtn} onClick={() => setShowModal(true)}>
          <Plus size={20} /> Agregar Objetivo
        </button>
      </div>

      <div className={styles.searchBar}>
        <Search size={20} className={styles.searchIcon} />
        <input 
          type="text" 
          placeholder="Buscar por dominio, IP..." 
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.targetsGrid}>
        {mockTargets.map(target => (
          <div key={target.id} className={styles.targetCard}>
            <div className={styles.cardHeader}>
              <h3 className={styles.targetName}>{target.name}</h3>
              <div 
                className={styles.riskIndicator} 
                style={{ backgroundColor: getRiskColor(target.risk) }}
                title={getRiskLabel(target.risk)}
              ></div>
            </div>
            
            <div className={styles.cardBody}>
              <div className={styles.statRow}>
                <Calendar size={16} className={styles.statIcon} />
                <span className={styles.statLabel}>Último escaneo:</span>
                <span className={styles.statValue}>{target.lastScan}</span>
              </div>
              <div className={styles.statRow}>
                <Network size={16} className={styles.statIcon} />
                <span className={styles.statLabel}>Puertos abiertos:</span>
                <span className={styles.statValue}>{target.ports}</span>
              </div>
              <div className={styles.statRow}>
                <ShieldAlert size={16} className={styles.statIcon} style={{ color: target.vulns > 0 ? 'var(--accent-red)' : '' }} />
                <span className={styles.statLabel}>Vulnerabilidades:</span>
                <span className={styles.statValue} style={{ color: target.vulns > 0 ? 'var(--accent-red)' : '' }}>{target.vulns}</span>
              </div>
            </div>
            
            <div className={styles.cardActions}>
              <button className={`${styles.actionBtn} ${styles.primary}`}>
                <Play size={16} /> Scan
              </button>
              <button className={`${styles.actionBtn} ${styles.secondary}`}>
                <Globe size={16} /> OSINT
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Agregar Nuevo Objetivo</h2>
            <div className={styles.formGroup}>
              <label>Dirección (IP, Dominio, Rango)</label>
              <input type="text" className={styles.modalInput} placeholder="ej. 192.168.1.1" />
            </div>
            <div className={styles.formGroup}>
              <label>Descripción / Etiqueta</label>
              <input type="text" className={styles.modalInput} placeholder="ej. Servidor de Producción" />
            </div>
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setShowModal(false)}>Cancelar</button>
              <button className={styles.saveBtn} onClick={() => setShowModal(false)}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Targets;
