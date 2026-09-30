import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Github, Twitter, Linkedin } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  const { t } = useTranslation('common');

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <h3 className={styles.title}>{t('footer.product', 'Producto')}</h3>
            <ul className={styles.list}>
              <li><Link to="/features">{t('footer.features', 'Características')}</Link></li>
              <li><Link to="/pricing">{t('footer.pricing', 'Precios')}</Link></li>
              <li><Link to="/docs">{t('footer.docs', 'Documentación')}</Link></li>
              <li><Link to="/faq">{t('footer.faq', 'FAQ')}</Link></li>
            </ul>
          </div>
          
          <div className={styles.column}>
            <h3 className={styles.title}>{t('footer.legal', 'Legal')}</h3>
            <ul className={styles.list}>
              <li><Link to="/privacy">{t('footer.privacy', 'Privacidad')}</Link></li>
              <li><Link to="/terms">{t('footer.terms', 'Términos')}</Link></li>
              <li><Link to="/cookies">{t('footer.cookies', 'Cookies')}</Link></li>
              <li><Link to="/legal">{t('footer.legalDocs', 'Legal')}</Link></li>
            </ul>
          </div>
          
          <div className={styles.column}>
            <h3 className={styles.title}>{t('footer.company', 'Compañía')}</h3>
            <ul className={styles.list}>
              <li><Link to="/about">{t('footer.about', 'Acerca de')}</Link></li>
              <li><Link to="/contact">{t('footer.contact', 'Contacto')}</Link></li>
            </ul>
          </div>
          
          <div className={styles.column}>
            <h3 className={styles.title}>{t('footer.connect', 'Conectar')}</h3>
            <div className={styles.social}>
              <a href="https://github.com/phound" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://twitter.com/phound" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com/company/phound" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} pHound. {t('footer.rights', 'Todos los derechos reservados.')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
