import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User, Globe, Key, Shield, Bell, Eye, EyeOff, Save, CheckCircle } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import styles from './Settings.module.css';

const Settings = () => {
  const { t } = useTranslation('settings');
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [showKeys, setShowKeys] = useState({});
  const [toast, setToast] = useState(false);

  const toggleKey = (key) => {
    setShowKeys(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const MaskedInput = ({ label, value, id }) => (
    <div className={styles.formGroup}>
      <label>{label}</label>
      <div className={styles.inputWrapper}>
        <input 
          type={showKeys[id] ? "text" : "password"} 
          className={styles.input} 
          defaultValue={value}
          readOnly
        />
        <button className={styles.iconBtn} onClick={() => toggleKey(id)}>
          {showKeys[id] ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Configuración</h1>
        <button className={styles.saveBtn} onClick={handleSave}>
          <Save size={18} /> Guardar Cambios
        </button>
      </div>

      <div className={styles.layout}>
        <div className={styles.sidebar}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'profile' ? styles.active : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={18} /> Perfil
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'general' ? styles.active : ''}`}
            onClick={() => setActiveTab('general')}
          >
            <Globe size={18} /> General
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'apikeys' ? styles.active : ''}`}
            onClick={() => setActiveTab('apikeys')}
          >
            <Key size={18} /> API Keys
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'stealth' ? styles.active : ''}`}
            onClick={() => setActiveTab('stealth')}
          >
            <Shield size={18} /> Stealth Mode
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'notifications' ? styles.active : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell size={18} /> Notificaciones
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.card}>
            {activeTab === 'profile' && (
              <div className={styles.section}>
                <h2>Información de Perfil</h2>
                <div className={styles.profileAvatar}>
                  <div className={styles.avatarPlaceholder}>HA</div>
                  <button className={styles.secondaryBtn}>Cambiar Avatar</button>
                </div>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Nombre Completo</label>
                    <input type="text" className={styles.input} defaultValue="Hugo A." />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Correo Electrónico</label>
                    <input type="email" className={styles.input} defaultValue="hugo@example.com" disabled />
                  </div>
                </div>
                
                <h3 className={styles.subHeading}>Seguridad</h3>
                <button className={styles.secondaryBtn}>Cambiar Contraseña</button>
              </div>
            )}

            {activeTab === 'general' && (
              <div className={styles.section}>
                <h2>Configuración General</h2>
                <div className={styles.formGroup}>
                  <label>Idioma de la Interfaz</label>
                  <select className={styles.select} defaultValue="es">
                    <option value="es">Español</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Tema Visual</label>
                  <select 
                    className={styles.select} 
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                  >
                    <option value="dark">Oscuro</option>
                    <option value="light">Claro</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Zona Horaria</label>
                  <select className={styles.select} defaultValue="utc-7">
                    <option value="utc-7">Pacific Time (PT) UTC-7</option>
                    <option value="utc-6">Mountain Time (MT) UTC-6</option>
                    <option value="utc">UTC</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'apikeys' && (
              <div className={styles.section}>
                <h2>Integraciones API</h2>
                <p className={styles.description}>Configura tus claves API para habilitar funciones avanzadas de OSINT. El modelo de IA para reportes está incluido localmente en pHound.</p>
                
                <div className={styles.apiKeysList}>
                  <MaskedInput label="Shodan API Key (OSINT)" id="shodan" value="a1b2c3d4e5f6" />
                  <MaskedInput label="VirusTotal API Key" id="vt" value="98765432abcd" />
                </div>

                <div className={styles.infoNote}>
                  <strong>pHound AI</strong> — El modelo de inteligencia artificial para generación de reportes se ejecuta localmente. No se requiere API key externa.
                </div>
              </div>
            )}

            {activeTab === 'stealth' && (
              <div className={styles.section}>
                <h2>Stealth Mode & Proxies</h2>
                <div className={styles.formGroup}>
                  <label>Nivel de Anonimato por Defecto</label>
                  <select className={styles.select} defaultValue="basic">
                    <option value="none">Ninguno (Conexión Directa)</option>
                    <option value="basic">Básico (User-Agent Spoofing)</option>
                    <option value="advanced">Avanzado (Tor / Proxies Rotativos)</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label>Configuración de Proxy (HTTP/SOCKS5)</label>
                  <input type="text" className={styles.input} placeholder="ej. socks5://127.0.0.1:9050" />
                </div>

                <div className={styles.formGroup}>
                  <label>Límite de Tasa Global (Peticiones / seg)</label>
                  <input type="range" min="1" max="100" defaultValue="10" className={styles.slider} />
                  <span className={styles.sliderValue}>10 req/s</span>
                </div>
                
                <div className={styles.toggleWrapper}>
                  <label className={styles.toggleLabel}>
                    <div>
                      <strong>Requerir VPN Activa</strong>
                      <p>No permitir escaneos si la interfaz VPN (tun0) no está presente.</p>
                    </div>
                    <div className={styles.toggle}>
                      <input type="checkbox" defaultChecked />
                      <span className={styles.toggleSlider}></span>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className={styles.section}>
                <h2>Preferencias de Notificación</h2>
                <div className={styles.toggleList}>
                  <label className={styles.toggleLabel}>
                    <span>Resumen Semanal por Email</span>
                    <div className={styles.toggle}>
                      <input type="checkbox" defaultChecked />
                      <span className={styles.toggleSlider}></span>
                    </div>
                  </label>
                  <label className={styles.toggleLabel}>
                    <span>Alerta al Completar Escaneo</span>
                    <div className={styles.toggle}>
                      <input type="checkbox" defaultChecked />
                      <span className={styles.toggleSlider}></span>
                    </div>
                  </label>
                  <label className={styles.toggleLabel}>
                    <span>Alerta de Vulnerabilidad Crítica</span>
                    <div className={styles.toggle}>
                      <input type="checkbox" defaultChecked />
                      <span className={styles.toggleSlider}></span>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && (
        <div className={styles.toast}>
          <CheckCircle size={20} /> Configuración guardada correctamente
        </div>
      )}
    </div>
  );
};

export default Settings;
