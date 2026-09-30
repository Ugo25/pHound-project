import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Edit, FileText, BarChart2, ShieldAlert } from 'lucide-react';
import styles from './ReportDetail.module.css';

const ReportDetail = () => {
  const { id } = useParams();

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <Link to="/app/reports" className={styles.backLink}>
          <ArrowLeft size={16} /> Volver a Reportes
        </Link>
        <div className={styles.actions}>
          <button className={`${styles.actionBtn} ${styles.btnPrimary}`}>
            <Download size={16} /> Descargar PDF
          </button>
          <button className={`${styles.actionBtn} ${styles.btnSecondary}`}>
            <Share2 size={16} /> Compartir
          </button>
          <button className={`${styles.actionBtn} ${styles.btnSecondary}`}>
            <Edit size={16} /> Editar
          </button>
        </div>
      </div>

      <div className={styles.documentWrapper}>
        <div className={styles.document}>
          <div className={styles.docHeader}>
            <div className={styles.logo}>pHound Report</div>
            <div className={styles.docMeta}>
              <div><strong>ID:</strong> {id || 'REP-001'}</div>
              <div><strong>Fecha:</strong> 28 Septiembre 2026</div>
              <div><strong>Autor:</strong> Sistema Automático (IA)</div>
            </div>
          </div>

          <h1 className={styles.docTitle}>Auditoría de Seguridad - Producción</h1>

          <div className={styles.docSection}>
            <h2><FileText size={20} /> 1. Resumen Ejecutivo</h2>
            <p>
              Este informe detalla los resultados de la auditoría de seguridad realizada sobre la infraestructura de producción. 
              El objetivo principal fue identificar vulnerabilidades explotables y evaluar la postura de seguridad general.
            </p>
            <p>
              Se identificaron un total de <strong>15 vulnerabilidades</strong>, de las cuales 3 son de severidad crítica y requieren remediación inmediata. 
              El nivel de riesgo general se ha clasificado como <strong>Alto</strong>.
            </p>
          </div>

          <div className={styles.docSection}>
            <h2><BarChart2 size={20} /> 2. Estadísticas Generales</h2>
            <div className={styles.statsGrid}>
              <div className={styles.statBox}>
                <div className={styles.statNum}>15</div>
                <div className={styles.statLabel}>Total Hallazgos</div>
              </div>
              <div className={styles.statBox} style={{ borderColor: 'var(--accent-red)' }}>
                <div className={styles.statNum} style={{ color: 'var(--accent-red)' }}>3</div>
                <div className={styles.statLabel}>Críticas</div>
              </div>
              <div className={styles.statBox} style={{ borderColor: '#ff7675' }}>
                <div className={styles.statNum} style={{ color: '#ff7675' }}>3</div>
                <div className={styles.statLabel}>Altas</div>
              </div>
              <div className={styles.statBox} style={{ borderColor: 'var(--accent-orange)' }}>
                <div className={styles.statNum} style={{ color: 'var(--accent-orange)' }}>5</div>
                <div className={styles.statLabel}>Medias</div>
              </div>
            </div>
          </div>

          <div className={styles.docSection}>
            <h2><ShieldAlert size={20} /> 3. Hallazgos Principales</h2>
            <div className={styles.finding}>
              <div className={styles.findingHeader}>
                <span className={styles.findingBadge} style={{ backgroundColor: 'rgba(255, 71, 87, 0.1)', color: 'var(--accent-red)' }}>CRITICAL</span>
                <h3>CVE-2024-1234: Ejecución Remota de Código</h3>
              </div>
              <p><strong>Objetivo:</strong> example.com (http - puerto 80)</p>
              <p>El servidor web expone un endpoint de API vulnerable a inyección de comandos, permitiendo la ejecución de código arbitrario.</p>
              <h4>Recomendación:</h4>
              <p>Actualizar el servidor a la versión parcheada e implementar reglas estrictas de WAF.</p>
            </div>
            
            <div className={styles.finding}>
              <div className={styles.findingHeader}>
                <span className={styles.findingBadge} style={{ backgroundColor: 'rgba(255, 118, 117, 0.1)', color: '#ff7675' }}>HIGH</span>
                <h3>Configuración Débil de SSH</h3>
              </div>
              <p><strong>Objetivo:</strong> 192.168.1.100 (ssh - puerto 22)</p>
              <p>El servicio SSH soporta algoritmos de cifrado obsoletos (CBC) que son susceptibles a ataques de recuperación de texto plano.</p>
              <h4>Recomendación:</h4>
              <p>Modificar la configuración <code>sshd_config</code> para deshabilitar cifrados CBC y permitir únicamente CTR o GCM.</p>
            </div>
          </div>
          
          <div className={styles.docFooter}>
            Generado confidencialmente por la plataforma pHound.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;
