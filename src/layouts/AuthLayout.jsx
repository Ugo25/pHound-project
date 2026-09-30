import React from 'react';
import styles from './AuthLayout.module.css';

const AuthLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.animatedBackground}></div>
      {children}
    </div>
  );
};

export default AuthLayout;
