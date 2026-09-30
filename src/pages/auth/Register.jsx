import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, User, Eye, EyeOff, CheckCircle } from 'lucide-react';
import styles from './Register.module.css';

const Register = () => {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreed: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const reqs = {
    length: formData.password.length >= 12,
    upper: /[A-Z]/.test(formData.password),
    lower: /[a-z]/.test(formData.password),
    digit: /[0-9]/.test(formData.password),
    symbol: /[^A-Za-z0-9]/.test(formData.password)
  };
  const strengthScore = Object.values(reqs).filter(Boolean).length;
  
  const getStrengthColor = () => {
    if (strengthScore <= 2) return 'var(--accent-red)';
    if (strengthScore === 3) return 'var(--accent-orange)';
    if (strengthScore === 4) return 'var(--accent-yellow)';
    return 'var(--accent-green)';
  };

  const isFormValid = formData.name && 
                      formData.email && 
                      formData.password === formData.confirmPassword && 
                      strengthScore === 5 && 
                      formData.agreed;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <img src="/logo.png" alt="pHound Logo" className={styles.logo} />
          <h2 className={styles.brandName}>pHound</h2>
          <h1 className={styles.title}>{t('register.title', 'Crear Cuenta')}</h1>
        </div>

        {success ? (
          <div className={styles.successMessage}>
            <CheckCircle className={styles.successIcon} size={48} />
            <p>{t('register.success', '¡Cuenta creada con éxito! Redirigiendo...')}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <User className={styles.icon} />
              <input
                type="text"
                placeholder={t('register.name_placeholder', 'Nombre completo')}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <Mail className={styles.icon} />
              <input
                type="email"
                placeholder={t('register.email_placeholder', 'Correo Electrónico')}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className={styles.input}
              />
            </div>

            <div className={styles.inputGroup}>
              <Lock className={styles.icon} />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder={t('register.password_placeholder', 'Contraseña')}
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className={styles.input}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.togglePassword}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {formData.password && (
              <div className={styles.passwordStrength}>
                <div className={styles.strengthBarContainer}>
                  <div 
                    className={styles.strengthBar} 
                    style={{ 
                      width: `${(strengthScore / 5) * 100}%`,
                      backgroundColor: getStrengthColor()
                    }}
                  />
                </div>
                <div className={styles.requirementsList}>
                  <span className={reqs.length ? styles.reqMet : ''}>Min 12 chars</span>
                  <span className={reqs.upper ? styles.reqMet : ''}>Uppercase</span>
                  <span className={reqs.lower ? styles.reqMet : ''}>Lowercase</span>
                  <span className={reqs.digit ? styles.reqMet : ''}>Digit</span>
                  <span className={reqs.symbol ? styles.reqMet : ''}>Symbol</span>
                </div>
              </div>
            )}

            <div className={styles.inputGroup}>
              <Lock className={styles.icon} />
              <input
                type="password"
                placeholder={t('register.confirm_password_placeholder', 'Confirmar contraseña')}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className={styles.input}
              />
            </div>

            <div className={styles.checkboxGroup}>
              <input 
                type="checkbox" 
                id="agreed"
                checked={formData.agreed}
                onChange={(e) => setFormData({...formData, agreed: e.target.checked})}
              />
              <label htmlFor="agreed">
                {t('register.agree', 'Acepto los')} <Link to="/terms" className={styles.link}>{t('register.terms', 'Términos y Condiciones')}</Link> {t('register.and', 'y')} <Link to="/privacy" className={styles.link}>{t('register.privacy', 'Política de Privacidad')}</Link>
              </label>
            </div>

            <button
              type="submit"
              className={styles.primaryButton}
              disabled={!isFormValid}
            >
              {t('register.submit', 'Crear Cuenta')}
            </button>
          </form>
        )}

        <div className={styles.footer}>
          <Link to="/login" className={styles.link}>
            {t('register.has_account', '¿Ya tienes cuenta? Iniciar sesión')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
