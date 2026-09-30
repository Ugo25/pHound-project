import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileOutput, CheckCircle, Search, Shield, BrainCircuit } from 'lucide-react';
import styles from './ReportGenerate.module.css';

const mockScans = [
  { id: 'SCN-1023', target: '192.168.1.100', date: 'Hoy, 10:30' },
  { id: 'SCN-1024', target: 'api.example.com', date: 'Ayer, 15:45' },
  { id: 'SCN-1025', target: '10.0.0.5', date: '25 Sep' },
];

const ReportGenerate = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    scans: [],
    type: '',
    detail: 'standard',
    lang: 'es'
  });
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');

  const toggleScan = (id) => {
    setFormData(prev => ({
      ...prev,
      scans: prev.scans.includes(id) 
        ? prev.scans.filter(s => s !== id)
        : [...prev.scans, id]
    }));
  };

  const handleGenerate = () => {
    setGenerating(true);
    const statuses = [
      'Analizando vulnerabilidades...',
      'Estructurando documento...',
      'Generando recomendaciones con pHound AI...',
      'Compilando reporte final...'
    ];
    
    let currentStep = 0;
    setStatusText(statuses[0]);

    const interval = setInterval(() => {
      setProgress(p => {
        const newP = p + 5;
        if (newP >= 25 && currentStep === 0) { currentStep++; setStatusText(statuses[currentStep]); }
        if (newP >= 50 && currentStep === 1) { currentStep++; setStatusText(statuses[currentStep]); }
        if (newP >= 75 && currentStep === 2) { currentStep++; setStatusText(statuses[currentStep]); }
        
        if (newP >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            navigate('/app/reports/REP-NEW');
          }, 1000);
          return 100;
        }
        return newP;
      });
    }, 200);
  };

  if (generating) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingCard}>
          <BrainCircuit size={64} className={styles.loadingIcon} />
          <h2 className={styles.loadingTitle}>Generando Reporte</h2>
          <p className={styles.loadingStatus}>{statusText}</p>
          
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
          </div>
          
          <div className={styles.skeletonContainer}>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonText}></div>
            <div className={styles.skeletonText} style={{ width: '80%' }}></div>
            <div className={styles.skeletonBox}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Generador de Reportes</h1>
      </div>

      <div className={styles.formCard}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Seleccionar Escaneos</h2>
          <div className={styles.scanList}>
            {mockScans.map(scan => (
              <label key={scan.id} className={`${styles.scanItem} ${formData.scans.includes(scan.id) ? styles.selected : ''}`}>
                <input 
                  type="checkbox" 
                  checked={formData.scans.includes(scan.id)}
                  onChange={() => toggleScan(scan.id)}
                  className={styles.hiddenInput}
                />
                <div className={styles.scanCheckbox}>
                  {formData.scans.includes(scan.id) && <CheckCircle size={16} />}
                </div>
                <div className={styles.scanDetails}>
                  <span className={styles.scanTarget}>{scan.target}</span>
                  <span className={styles.scanId}>{scan.id} • {scan.date}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Tipo de Reporte</h2>
          <div className={styles.typeCards}>
            <div 
              className={`${styles.typeCard} ${formData.type === 'tecnico' ? styles.active : ''}`}
              onClick={() => setFormData({...formData, type: 'tecnico'})}
            >
              <Search size={32} className={styles.typeIcon} style={{ color: 'var(--accent-cyan)' }} />
              <h3>Técnico</h3>
              <p>Detalles técnicos completos, payloads y evidencias para equipos de TI.</p>
            </div>
            <div 
              className={`${styles.typeCard} ${formData.type === 'ejecutivo' ? styles.active : ''}`}
              onClick={() => setFormData({...formData, type: 'ejecutivo'})}
            >
              <Shield size={32} className={styles.typeIcon} style={{ color: 'var(--accent-purple)' }} />
              <h3>Ejecutivo</h3>
              <p>Resumen de alto nivel, impacto en el negocio y métricas de riesgo.</p>
            </div>
            <div 
              className={`${styles.typeCard} ${formData.type === 'mixto' ? styles.active : ''}`}
              onClick={() => setFormData({...formData, type: 'mixto'})}
            >
              <FileOutput size={32} className={styles.typeIcon} style={{ color: 'var(--accent-orange)' }} />
              <h3>Mixto</h3>
              <p>Combina resumen ejecutivo con anexos técnicos detallados.</p>
            </div>
          </div>
        </div>

        <div className={styles.twoColSection}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Nivel de Detalle</h2>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input 
                  type="radio" 
                  name="detail" 
                  value="summary" 
                  checked={formData.detail === 'summary'}
                  onChange={(e) => setFormData({...formData, detail: e.target.value})}
                />
                <span className={styles.radioCustom}></span>
                Resumido
              </label>
              <label className={styles.radioLabel}>
                <input 
                  type="radio" 
                  name="detail" 
                  value="standard" 
                  checked={formData.detail === 'standard'}
                  onChange={(e) => setFormData({...formData, detail: e.target.value})}
                />
                <span className={styles.radioCustom}></span>
                Estándar
              </label>
              <label className={styles.radioLabel}>
                <input 
                  type="radio" 
                  name="detail" 
                  value="detailed" 
                  checked={formData.detail === 'detailed'}
                  onChange={(e) => setFormData({...formData, detail: e.target.value})}
                />
                <span className={styles.radioCustom}></span>
                Detallado (Incluir falsos positivos)
              </label>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Idioma</h2>
            <div className={styles.langToggle}>
              <button 
                className={`${styles.langBtn} ${formData.lang === 'es' ? styles.langActive : ''}`}
                onClick={() => setFormData({...formData, lang: 'es'})}
              >
                Español (ES)
              </button>
              <button 
                className={`${styles.langBtn} ${formData.lang === 'en' ? styles.langActive : ''}`}
                onClick={() => setFormData({...formData, lang: 'en'})}
              >
                English (EN)
              </button>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button 
            className={`${styles.btnGenerate} ${formData.scans.length > 0 && formData.type ? '' : styles.disabled}`}
            onClick={handleGenerate}
            disabled={!(formData.scans.length > 0 && formData.type)}
          >
            <BrainCircuit size={20} /> Generar con pHound AI
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerate;
