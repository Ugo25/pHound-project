import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Zap, Settings, ArrowRight, ArrowLeft, Play, Info } from 'lucide-react';
import styles from './NewScan.module.css';

const NewScan = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    target: '',
    options: {
      tools: {
        whois: true,
        dns: true,
        geoip: true,
        subdomains: true,
        shodan: true,
        nmap: true,
        gobuster: true,
        nikto: true
      },
      speed: 'normal',
      ports: 'top-1000'
    }
  });

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleLaunch = () => {
    // Mock launch, redirect to live scan view
    navigate('/app/scans/SCN-MOCK-LIVE/live');
  };

  const handleToolChange = (tool) => {
    setFormData({
      ...formData,
      options: {
        ...formData.options,
        tools: {
          ...formData.options.tools,
          [tool]: !formData.options.tools[tool]
        }
      }
    });
  };

  const scanTypes = [
    { 
      id: 'pasivo', 
      icon: Eye, 
      title: 'Escaneo Pasivo', 
      desc: 'Reconocimiento sin contacto directo con el objetivo' 
    },
    { 
      id: 'activo', 
      icon: Zap, 
      title: 'Escaneo Activo', 
      desc: 'Escaneo directo de puertos, servicios y vulnerabilidades' 
    },
    { 
      id: 'personalizado', 
      icon: Settings, 
      title: 'Personalizado', 
      desc: 'Selecciona libremente las herramientas pasivas y activas' 
    }
  ];

  const passiveTools = ['whois', 'dns', 'geoip', 'subdomains', 'shodan'];
  const activeTools = ['nmap', 'gobuster', 'nikto'];

  const renderToolsChips = (tools, readOnly = false) => {
    return (
      <div className={styles.toolsChips}>
        {tools.map(tool => {
          const isSelected = formData.options.tools[tool];
          return (
            <div 
              key={tool} 
              className={`${styles.chip} ${isSelected ? styles.chipSelected : ''} ${readOnly ? styles.chipReadOnly : ''}`}
              onClick={() => !readOnly && handleToolChange(tool)}
            >
              {tool.charAt(0).toUpperCase() + tool.slice(1)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderStep3 = () => {
    return (
      <div className={styles.stepContent}>
        <h2 className={styles.stepTitle}>Opciones Avanzadas</h2>
        <div className={styles.optionsGrid}>
          
          {formData.type === 'pasivo' && (
            <div className={styles.optionsSection}>
              <h3>Herramientas Pasivas</h3>
              {renderToolsChips(passiveTools, true)}
              <p className={styles.noteText}>Las herramientas pasivas se pueden modificar en Configuración</p>
            </div>
          )}

          {formData.type === 'activo' && (
            <>
              <div className={styles.optionsSection}>
                <h3>Herramientas Activas</h3>
                {renderToolsChips(activeTools, true)}
                <p className={styles.noteText}>Las herramientas activas se pueden modificar en Configuración</p>
              </div>
              <div className={styles.optionsSection}>
                <h3>Perfil de Velocidad</h3>
                <div className={styles.radioGroup}>
                  {['Stealth (T1)', 'Normal (T3)', 'Aggressive (T4)'].map(speed => {
                    const val = speed.split(' ')[0].toLowerCase();
                    return (
                      <label key={val} className={styles.radioLabel}>
                        <input type="radio" name="speed" value={val} checked={formData.options.speed === val} onChange={(e) => setFormData({...formData, options: {...formData.options, speed: e.target.value}})} />
                        <span className={styles.radioCustom}></span>
                        {speed}
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className={styles.optionsSection}>
                <h3>Rango de Puertos</h3>
                <select className={styles.select} value={formData.options.ports} onChange={(e) => setFormData({...formData, options: {...formData.options, ports: e.target.value}})}>
                  <option value="top-1000">Top 1000 puertos</option>
                  <option value="all">Todos (1-65535)</option>
                  <option value="custom">Personalizado...</option>
                </select>
              </div>
            </>
          )}

          {formData.type === 'personalizado' && (
            <>
              <div className={styles.optionsSection}>
                <h3>Herramientas Pasivas</h3>
                {renderToolsChips(passiveTools, false)}
              </div>
              <div className={styles.optionsSection}>
                <h3>Herramientas Activas</h3>
                {renderToolsChips(activeTools, false)}
              </div>
              <div className={styles.optionsSection}>
                <h3>Perfil de Velocidad</h3>
                <div className={styles.radioGroup}>
                  {['Stealth (T1)', 'Normal (T3)', 'Aggressive (T4)'].map(speed => {
                    const val = speed.split(' ')[0].toLowerCase();
                    return (
                      <label key={val} className={styles.radioLabel}>
                        <input type="radio" name="speed" value={val} checked={formData.options.speed === val} onChange={(e) => setFormData({...formData, options: {...formData.options, speed: e.target.value}})} />
                        <span className={styles.radioCustom}></span>
                        {speed}
                      </label>
                    );
                  })}
                </div>
              </div>
              <div className={styles.optionsSection}>
                <h3>Rango de Puertos</h3>
                <select className={styles.select} value={formData.options.ports} onChange={(e) => setFormData({...formData, options: {...formData.options, ports: e.target.value}})}>
                  <option value="top-1000">Top 1000 puertos</option>
                  <option value="all">Todos (1-65535)</option>
                  <option value="custom">Personalizado...</option>
                </select>
              </div>
            </>
          )}

        </div>
      </div>
    );
  };

  const getSelectedToolsSummary = () => {
    let tools = [];
    if (formData.type === 'pasivo' || formData.type === 'personalizado') {
      tools = tools.concat(passiveTools.filter(t => formData.options.tools[t]));
    }
    if (formData.type === 'activo' || formData.type === 'personalizado') {
      tools = tools.concat(activeTools.filter(t => formData.options.tools[t]));
    }
    return tools.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Nuevo Escaneo</h1>
      </div>

      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
        </div>
        <div className={styles.stepIndicators}>
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`${styles.stepIndicator} ${s <= step ? styles.active : ''} ${s === step ? styles.current : ''}`}>
              {s}
            </div>
          ))}
        </div>
        <div className={styles.stepLabels}>
          <span>Tipo</span>
          <span>Objetivo</span>
          <span>Opciones</span>
          <span>Revisión</span>
        </div>
      </div>

      <div className={styles.wizardContent}>
        {step === 1 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Selecciona el tipo de escaneo</h2>
            <div className={styles.typeGrid}>
              {scanTypes.map(type => (
                <div 
                  key={type.id} 
                  className={`${styles.typeCard} ${formData.type === type.id ? styles.selected : ''}`}
                  onClick={() => setFormData({...formData, type: type.id})}
                >
                  <type.icon size={40} className={styles.typeIcon} />
                  <h3>{type.title}</h3>
                  <p>{type.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Define el objetivo</h2>
            <div className={styles.targetInputContainer}>
              <label className={styles.label}>Dirección IP, Rango o Dominio</label>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="ej. 192.168.1.1, 10.0.0.0/24, example.com"
                value={formData.target}
                onChange={(e) => setFormData({...formData, target: e.target.value})}
              />
              <div className={styles.infoBox}>
                <Info size={16} />
                <span>Asegúrate de tener autorización para escanear este objetivo.</span>
              </div>
            </div>
          </div>
        )}

        {step === 3 && renderStep3()}

        {step === 4 && (
          <div className={styles.stepContent}>
            <h2 className={styles.stepTitle}>Revisión y Confirmación</h2>
            <div className={styles.summaryCard}>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Objetivo:</span>
                <span className={styles.summaryValueTarget}>{formData.target || 'No especificado'}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Tipo de Escaneo:</span>
                <span className={styles.summaryValue}>{scanTypes.find(t => t.id === formData.type)?.title || 'No seleccionado'}</span>
              </div>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Herramientas:</span>
                <span className={styles.summaryValue}>{getSelectedToolsSummary() || 'Ninguna'}</span>
              </div>
              {(formData.type === 'activo' || formData.type === 'personalizado') && (
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Perfil Velocidad:</span>
                  <span className={styles.summaryValue}>{formData.options.speed}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className={styles.actions}>
        <button 
          className={`${styles.btn} ${styles.btnSecondary}`} 
          onClick={handleBack} 
          disabled={step === 1}
        >
          <ArrowLeft size={18} /> Atrás
        </button>
        
        {step < 4 ? (
          <button 
            className={`${styles.btn} ${styles.btnPrimary}`} 
            onClick={handleNext}
            disabled={(step === 1 && !formData.type) || (step === 2 && !formData.target)}
          >
            Siguiente <ArrowRight size={18} />
          </button>
        ) : (
          <button 
            className={`${styles.btn} ${styles.btnLaunch}`} 
            onClick={handleLaunch}
          >
            <Play size={18} /> Lanzar Escaneo
          </button>
        )}
      </div>
    </div>
  );
};

export default NewScan;
