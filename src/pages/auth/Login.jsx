import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/security/auth';
import ThemeSwitcher from '../../components/common/ThemeSwitcher';
import styles from './Login.module.css';

const Login = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTimer, setLockoutTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (lockoutTimer > 0) {
      interval = setInterval(() => {
        setLockoutTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [lockoutTimer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (lockoutTimer > 0) return;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError(t('login.error.invalid_email', 'Correo electrónico inválido.'));
      return;
    }
    if (!password) {
      setError(t('login.error.empty_password', 'La contraseña no puede estar vacía.'));
      return;
    }

    try {
      await login(email, password);
      navigate('/app');
    } catch (err) {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      if (newAttempts >= 5) {
        setLockoutTimer(300); // 5 minutes
        setError(t('login.error.locked', 'Demasiados intentos. Cuenta bloqueada por 5 minutos.'));
      } else if (newAttempts >= 3) {
        setError(t('login.error.warning', `Credenciales incorrectas. Te quedan ${5 - newAttempts} intentos.`));
      } else {
        setError(t('login.error.invalid_credentials', 'Credenciales incorrectas.'));
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.themeSwitcherWrapper}>
        <ThemeSwitcher />
      </div>

      {/* Left Branding Panel */}
      <div className={styles.brandPanel}>
        <div className={styles.brandContent}>
          <img src="/logo.png" alt="pHound" className={styles.brandLogo} />
          <h1 className={styles.brandTitle}>pHound</h1>
          <p className={styles.brandSubtitle}>Suite de auditoría de ciberseguridad</p>
          <p className={styles.brandDescription}>OSINT · Escaneo Activo · IA · Docker</p>
        </div>
      </div>
      
      {/* Right Form Panel */}
      <div className={styles.formPanel}>
        <div className={styles.formContent}>
          <h2 className={styles.title}>{t('login.title', 'Iniciar Sesión')}</h2>
          <p className={styles.subtitle}>{t('login.subtitle', 'Ingresa tus credenciales para acceder a tu cuenta')}</p>
          
          {error && <div className={styles.error}>{error}</div>}
          {lockoutTimer > 0 && (
            <div className={styles.warning}>
              {t('login.locked_timer', 'Por favor intenta de nuevo en {{time}} segundos.', { time: lockoutTimer })}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label}>{t('login.email_label', 'Correo Electrónico')}</label>
              <div className={styles.inputGroup}>
                <Mail className={styles.icon} size={20} />
                <input
                  type="email"
                  placeholder="ejemplo@empresa.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={lockoutTimer > 0}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>{t('login.password_label', 'Contraseña')}</label>
              <div className={styles.inputGroup}>
                <Lock className={styles.icon} size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={lockoutTimer > 0}
                  className={styles.input}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.togglePassword}
                  tabIndex="-1"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className={styles.actions}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" />
                <span>{t('login.remember_me', 'Recordarme')}</span>
              </label>
              <Link to="/forgot-password" className={styles.link}>
                {t('login.forgot_password', '¿Olvidaste tu contraseña?')}
              </Link>
            </div>

            <button
              type="submit"
              className={styles.primaryButton}
              disabled={lockoutTimer > 0}
            >
              {t('login.submit', 'Iniciar Sesión')}
            </button>
          </form>

          <div className={styles.divider}>
            <span>{t('login.or_continue_with', 'o continúa con')}</span>
          </div>

          <div className={styles.oauthContainer}>
            <button className={styles.oauthButton}>Google</button>
            <button className={styles.oauthButton}>GitHub</button>
          </div>

          <div className={styles.footer}>
            <Link to="/register" className={styles.link}>
              {t('login.no_account', '¿No tienes cuenta? Crear cuenta')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
