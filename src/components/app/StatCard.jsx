import React from 'react';
import styles from './StatCard.module.css';

const StatCard = ({ icon: Icon, title, value, trend, trendDirection, color = 'var(--accent-cyan)' }) => {
  return (
    <div className={styles.card} style={{ '--card-color': color }}>
      <div className={styles.header}>
        <div className={styles.iconWrapper} style={{ color }}>
          {Icon && <Icon size={24} />}
        </div>
        {trend && (
          <div className={`${styles.trend} ${styles[trendDirection]}`}>
            {trend}
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.value}>{value}</div>
        <div className={styles.title}>{title}</div>
      </div>
    </div>
  );
};

export default StatCard;
