import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Clock, ShieldAlert, X, Minimize2, CheckCircle } from 'lucide-react';
import TerminalOutput from '../../components/app/TerminalOutput';
import styles from './ScanLive.module.css';

const ScanLive = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('initializing');
  const [output, setOutput] = useState('Initializing scan engine...\nLoading configuration...');
  const [stats, setStats] = useState({ ports: 0, vulns: 0, time: 0 });

  useEffect(() => {
    let timer;
    if (status !== 'completed' && status !== 'cancelled') {
      timer = setInterval(() => {
        setStats(s => ({ ...s, time: s.time + 1 }));
        
        setProgress(p => {
          const newP = p + (Math.random() * 2);
          if (newP >= 100) {
            setStatus('completed');
            return 100;
          }
          return newP;
        });

        if (Math.random() > 0.7) {
          setStats(s => ({ ...s, ports: s.ports + 1 }));
          setOutput(prev => prev + `\n[+] Discovered open port ${Math.floor(Math.random() * 1000)}/tcp`);
        }
        
        if (Math.random() > 0.95) {
          setStats(s => ({ ...s, vulns: s.vulns + 1 }));
          setOutput(prev => prev + `\n[!] Potential vulnerability detected on target service`);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [status]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.pulseIndicator}>
            <div className={`${styles.pulse} ${styles[status]}`}></div>
          </div>
          <div>
            <h1 className={styles.title}>Escaneo en Progreso</h1>
            <div className={styles.targetInfo}>Target: <span className={styles.targetIp}>example.com</span></div>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnIcon}><Minimize2 size={20} /></button>
          <button className={styles.btnCancel} onClick={() => setStatus('cancelled')} disabled={status === 'completed'}>
            <X size={16} /> Cancelar
          </button>
        </div>
      </div>

      {status === 'completed' ? (
        <div className={styles.successCard}>
          <CheckCircle size={48} className={styles.successIcon} />
          <h2>Escaneo Completado Exitosamente</h2>
          <p>El análisis ha finalizado. Se han encontrado {stats.ports} puertos abiertos y {stats.vulns} posibles vulnerabilidades.</p>
          <button className={styles.btnViewResults} onClick={() => navigate('/app/scans/SCN-MOCK')}>
            Ver Resultados Completos
          </button>
        </div>
      ) : (
        <>
          <div className={styles.progressCard}>
            <div className={styles.progressHeader}>
              <span className={styles.progressLabel}>
                {status === 'initializing' ? 'Iniciando...' : 'Escaneando...'}
              </span>
              <span className={styles.progressValue}>{Math.round(progress)}%</span>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill} 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <Clock size={24} className={styles.statIcon} />
              <div className={styles.statValue}>{formatTime(stats.time)}</div>
              <div className={styles.statLabel}>Tiempo Transcurrido</div>
            </div>
            <div className={styles.statCard}>
              <Activity size={24} className={styles.statIcon} style={{ color: 'var(--accent-cyan)' }} />
              <div className={styles.statValue}>{stats.ports}</div>
              <div className={styles.statLabel}>Puertos Encontrados</div>
            </div>
            <div className={styles.statCard}>
              <ShieldAlert size={24} className={styles.statIcon} style={{ color: 'var(--accent-red)' }} />
              <div className={styles.statValue}>{stats.vulns}</div>
              <div className={styles.statLabel}>Alertas Detectadas</div>
            </div>
          </div>
        </>
      )}

      <div className={styles.terminalWrapper}>
        <div className={styles.terminalHeader}>
          <h3>Live Output</h3>
        </div>
        <TerminalOutput output={output} autoScroll={true} />
      </div>
    </div>
  );
};

export default ScanLive;
