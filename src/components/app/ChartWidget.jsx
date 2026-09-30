import React from 'react';
import styles from './ChartWidget.module.css';

const ChartWidget = ({ title, children }) => {
  return (
    <div className={styles.widget}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.chartContainer}>
        {children}
      </div>
    </div>
  );
};

export default ChartWidget;
