import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSwitcher.module.css';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language.startsWith('es') ? 'en' : 'es';
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
  };

  const isEs = i18n.language.startsWith('es');

  return (
    <button 
      className={styles.switcher} 
      onClick={toggleLanguage}
      aria-label="Toggle language"
    >
      <span className={isEs ? styles.active : styles.inactive}>🇲🇽 ES</span>
      <span className={styles.divider}>|</span>
      <span className={!isEs ? styles.active : styles.inactive}>🇺🇸 EN</span>
    </button>
  );
};

export default LanguageSwitcher;
