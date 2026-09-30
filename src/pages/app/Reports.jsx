import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FileText, FileOutput, Calendar, Download, Eye, Share2 } from 'lucide-react';
import styles from './Reports.module.css';

const mockReports = [
  { id: 'REP-001', title: 'Auditoría Mensual Producción', date: '2026-09-28', type: 'Técnico', status: 'ready' },
  { id: 'REP-002', title: 'Resumen Ejecutivo Q3', date: '2026-09-15', type: 'Ejecutivo', status: 'ready' },
  { id: 'REP-003', title: 'Test de Intrusión Externo', date: '2026-09-10', type: 'Mixto', status: 'ready' },
  { id: 'REP-004', title: 'Análisis de Red Interna', date: '2026-09-05', type: 'Técnico', status: 'ready' },
  { id: 'REP-005', title: 'Reporte de Cumplimiento', date: '2026-08-30', type: 'Ejecutivo', status: 'ready' }
];

const Reports = () => {
  const { t } = useTranslation('reports');

  const getTypeColor = (type) => {
    switch (type) {
      case 'Técnico': return 'var(--accent-cyan)';
      case 'Ejecutivo': return 'var(--accent-purple)';
      case 'Mixto': return 'var(--accent-orange)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Reportes</h1>
        <Link to="/app/reports/generate" className={styles.generateBtn}>
          <FileOutput size={20} />
          <span>Generar Nuevo Reporte</span>
        </Link>
      </div>

      <div className={styles.reportsGrid}>
        {mockReports.map(report => (
          <div key={report.id} className={styles.reportCard}>
            <div className={styles.cardPreview}>
              <FileText size={48} className={styles.previewIcon} />
              <div className={styles.previewType} style={{ color: getTypeColor(report.type), borderColor: getTypeColor(report.type) }}>
                {report.type}
              </div>
            </div>
            
            <div className={styles.cardContent}>
              <h3 className={styles.reportTitle}>{report.title}</h3>
              
              <div className={styles.reportMeta}>
                <div className={styles.metaItem}>
                  <Calendar size={14} />
                  <span>{report.date}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.reportId}>{report.id}</span>
                </div>
              </div>
              
              <div className={styles.cardActions}>
                <Link to={`/app/reports/${report.id}`} className={`${styles.actionBtn} ${styles.primary}`}>
                  <Eye size={16} /> Ver
                </Link>
                <button className={`${styles.actionBtn} ${styles.secondary}`}>
                  <Download size={16} /> PDF
                </button>
                <button className={`${styles.actionBtn} ${styles.secondaryIcon}`}>
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
