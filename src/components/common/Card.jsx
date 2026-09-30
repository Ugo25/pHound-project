import React from 'react';
import styles from './Card.module.css';

const Card = ({ title, icon: Icon, children, className = '', hoverable = false, glowColor = 'var(--accent-cyan)' }) => {
  return (
    <div 
      className={`${styles.card} ${hoverable ? styles.hoverable : ''} ${className}`}
      style={{ '--glow-color': glowColor }}
    >
      {(title || Icon) && (
        <div className={styles.header}>
          {Icon && <Icon className={styles.icon} size={24} />}
          {title && <h3 className={styles.title}>{title}</h3>}
        </div>
      )}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Card;
