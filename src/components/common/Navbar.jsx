import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcher from './ThemeSwitcher';
import Button from './Button';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { t } = useTranslation('common');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home', 'Inicio'), path: '/' },
    { name: t('nav.features', 'Características'), path: '/features' },
    { name: t('nav.docs', 'Documentación'), path: '/docs' },
    { name: t('nav.pricing', 'Precios'), path: '/pricing' },
    { name: t('nav.contact', 'Contacto'), path: '/contact' }
  ];

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoContainer}>
          <img src="/logo.png" alt="pHound Logo" className={styles.logo} />
          <span className={styles.brandName}>pHound</span>
        </Link>
        
        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.mobileOpen : ''}`}>
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`${styles.navLink} ${location.pathname === link.path ? styles.active : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className={styles.actions}>
            <ThemeSwitcher />
          <LanguageSwitcher />
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="primary" size="sm">{t('nav.login', 'Iniciar Sesión')}</Button>
            </Link>
          </div>
        </nav>
        
        <button
          className={styles.mobileToggle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
