import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from './Button';
import styles from './ConsentManager.module.css';

const ConsentManager = () => {
  const { t } = useTranslation('common');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('phound_cookie_consent');
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (type) => {
    localStorage.setItem('phound_cookie_consent', type);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.banner}>
        <div className={styles.content}>
          <p>{t('cookies.message', 'Utilizamos cookies para mejorar su experiencia, analizar el tráfico y personalizar el contenido.')}</p>
        </div>
        <div className={styles.actions}>
          <Button variant="ghost" size="sm" onClick={() => handleConsent('settings')}>
            {t('cookies.settings', 'Configurar')}
          </Button>
          <Button variant="secondary" size="sm" onClick={() => handleConsent('essential')}>
            {t('cookies.essential', 'Solo esenciales')}
          </Button>
          <Button variant="primary" size="sm" onClick={() => handleConsent('all')}>
            {t('cookies.acceptAll', 'Aceptar todo')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConsentManager;
