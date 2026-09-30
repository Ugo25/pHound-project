import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { t } = useTranslation('dashboard');

  const recentActivity = [
    { id: 1, action: 'Scan Completed', target: '192.168.1.100', time: '10 mins ago', type: 'success' },
    { id: 2, action: 'High Vuln Found', target: 'api.example.com', time: '1 hour ago', type: 'danger' },
    { id: 3, action: 'Report Generated', target: 'Weekly Audit', time: '3 hours ago', type: 'info' },
    { id: 4, action: 'Scan Started', target: '10.0.0.5', time: '5 hours ago', type: 'neutral' },
    { id: 5, action: 'OSINT Lookup', target: 'example.com', time: '1 day ago', type: 'info' },
  ];

  const recentScans = [
    { id: 'SCN-1023', target: '192.168.1.100', type: 'Port Scan', status: 'Completed', date: '2026-09-29' },
    { id: 'SCN-1024', target: 'api.example.com', type: 'Web Scan', status: 'In Progress', date: '2026-09-29' },
    { id: 'SCN-1025', target: '10.0.0.5', type: 'Full Audit', status: 'Failed', date: '2026-09-28' },
    { id: 'SCN-1026', target: 'internal.corp', type: 'Port Scan', status: 'Completed', date: '2026-09-28' },
    { id: 'SCN-1027', target: 'staging.app', type: 'Web Scan', status: 'Completed', date: '2026-09-27' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <Link to="/app/scans/new" className={styles.newScanBtn}>
          <Plus size={20} />
          <span>Nuevo Escaneo</span>
        </Link>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.stat}>
          <span className={styles.statValue}>47</span>
          <span className={styles.statLabel}>Escaneos</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>23</span>
          <span className={styles.statLabel}>Vulnerabilidades</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>18</span>
          <span className={styles.statLabel}>Reportes</span>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.tableCol}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Escaneos Recientes</h3>
            <div className={styles.tableResponsive}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Objetivo</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {recentScans.map(scan => (
                    <tr key={scan.id}>
                      <td className={styles.targetCell}>{scan.target}</td>
                      <td>{scan.type}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles[scan.status.toLowerCase().replace(' ', '')]}`}>
                          {scan.status}
                        </span>
                      </td>
                      <td>{scan.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className={styles.activityCol}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Actividad Reciente</h3>
            <div className={styles.activityList}>
              {recentActivity.map(item => (
                <div key={item.id} className={styles.activityItem}>
                  <div className={`${styles.activityDot} ${styles[item.type]}`}></div>
                  <div className={styles.activityContent}>
                    <div className={styles.activityTop}>
                      <span className={styles.activityAction}>{item.action}</span>
                      <span className={styles.activityTime}>{item.time}</span>
                    </div>
                    <div className={styles.activityTarget}>{item.target}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
