import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Eye, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './ScanHistory.module.css';

const mockScans = Array.from({ length: 10 }).map((_, i) => ({
  id: `SCN-00${i + 1}`,
  target: i % 2 === 0 ? '192.168.1.1' : 'example.com',
  type: i % 3 === 0 ? 'Full Audit' : i % 2 === 0 ? 'Port Scan' : 'Web Scan',
  status: i === 0 ? 'in progress' : i === 2 ? 'error' : 'completed',
  startTime: `2026-09-2${8 - (i % 5)} 14:${30 - i}`,
  duration: i === 0 ? '-' : `${(i % 5) + 1}m ${i * 12}s`
}));

const ScanHistory = () => {
  const { t } = useTranslation('scans');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Historial de Escaneos</h1>
        <Link to="/app/scans/new" className={styles.newScanBtn}>
          <Plus size={20} />
          <span>Nuevo Escaneo</span>
        </Link>
      </div>

      <div className={styles.filterBar}>
        <div className={styles.searchBox}>
          <Search size={20} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Buscar por ID o Target..." 
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <Filter size={16} />
            <select className={styles.select}>
              <option value="all">Estado: Todos</option>
              <option value="completed">Completado</option>
              <option value="in_progress">En Progreso</option>
              <option value="error">Error</option>
            </select>
          </div>
          
          <div className={styles.filterGroup}>
            <select className={styles.select}>
              <option value="all">Tipo: Todos</option>
              <option value="port">Port Scan</option>
              <option value="web">Web Scan</option>
              <option value="full">Full Audit</option>
            </select>
          </div>
          
          <div className={styles.filterGroup}>
            <input type="date" className={styles.dateInput} />
          </div>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableResponsive}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Objetivo</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Inicio</th>
                <th>Duración</th>
                <th className={styles.textCenter}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {mockScans.map(scan => (
                <tr key={scan.id}>
                  <td className={styles.idCell}>{scan.id}</td>
                  <td className={styles.targetCell}>{scan.target}</td>
                  <td>{scan.type}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[scan.status.replace(' ', '')]}`}>
                      {scan.status}
                    </span>
                  </td>
                  <td>{scan.startTime}</td>
                  <td>{scan.duration}</td>
                  <td>
                    <div className={styles.actions}>
                      <Link to={`/app/scans/${scan.id}`} className={styles.actionBtn}>
                        <Eye size={18} />
                      </Link>
                      <button className={`${styles.actionBtn} ${styles.deleteBtn}`}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className={styles.pagination}>
          <span className={styles.pageInfo}>Mostrando 1-10 de 45 resultados</span>
          <div className={styles.pageControls}>
            <button className={styles.pageBtn} disabled><ChevronLeft size={20} /></button>
            <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
            <button className={styles.pageBtn}>2</button>
            <button className={styles.pageBtn}>3</button>
            <span className={styles.pageDots}>...</span>
            <button className={styles.pageBtn}>5</button>
            <button className={styles.pageBtn}><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanHistory;
