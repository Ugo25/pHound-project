import React from 'react';
import { Loader2 } from 'lucide-react';
import styles from './Button.module.css';

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  icon: Icon, 
  loading = false, 
  disabled = false, 
  onClick, 
  type = 'button', 
  children,
  className = '',
  ...props 
}) => {
  const btnClass = `${styles.button} ${styles[variant]} ${styles[size]} ${loading ? styles.loading : ''} ${className}`;

  return (
    <button 
      type={type} 
      className={btnClass} 
      onClick={onClick} 
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className={styles.spinner} size={18} />}
      {!loading && Icon && <Icon className={styles.icon} size={18} />}
      <span className={styles.content}>{children}</span>
    </button>
  );
};

export default Button;
