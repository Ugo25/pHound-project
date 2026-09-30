import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, CheckCircle } from 'lucide-react';
import styles from './ForgotPassword.module.css';

const ForgotPassword = () => {
  const { t } = useTranslation('auth');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <img src="/logo.png" alt="pHound Logo" className={styles.logo} />
          <h1 className={styles.title}>{t('forgot.title', 'Recuperar Contraseña')}</h1>
        </div>

        {submitted ? (
          <div className={styles.successState}>
            <CheckCircle className={styles.successIcon} size={48} />
            <p className={styles.description}>
              {t('forgot.success', 'Si el correo electrónico está registrado, recibirás un enlace para restablecer tu contraseña en breve.')}
            </p>
            <Link to="/login" className={styles.primaryButton}>
              {t('forgot.back_to_login', 'Volver a iniciar sesión')}
            </Link>
          </div>
        ) : (
          <>
            <p className={styles.description}>
              {t('forgot.instruction', 'Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.')}
            </p>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <Mail className={styles.icon} />
                <input
                  type="email"
                  placeholder={t('forgot.email_placeholder', 'Correo Electrónico')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>

              <button type="submit" className={styles.primaryButton}>
                {t('forgot.submit', 'Enviar enlace de recuperación')}
              </button>
            </form>

            <div className={styles.footer}>
              <Link to="/login" className={styles.link}>
                {t('forgot.back_to_login', 'Volver a iniciar sesión')}
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
