import React from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';
import styles from './VulnTable.module.css';

const severityColors = {
  Critical: 'var(--accent-red)',
  High: '#ff7675',
  Medium: 'var(--accent-orange)',
  Low: 'var(--accent-yellow)',
  Info: 'var(--accent-cyan)'
};

const VulnTable = ({ vulnerabilities }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>CVE ID</th>
            <th>Severity</th>
            <th>Service</th>
            <th>Target</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vulnerabilities.map((vuln) => (
            <tr key={vuln.id}>
              <td className={styles.cveId}>{vuln.cve}</td>
              <td>
                <span 
                  className={styles.badge} 
                  style={{ 
                    backgroundColor: `${severityColors[vuln.severity]}20`, 
                    color: severityColors[vuln.severity],
                    border: `1px solid ${severityColors[vuln.severity]}40`
                  }}
                >
                  {vuln.severity}
                </span>
              </td>
              <td>{vuln.service}</td>
              <td>{vuln.target}</td>
              <td>
                <span className={`${styles.status} ${styles[vuln.status.toLowerCase().replace(' ', '')]}`}>
                  {vuln.status}
                </span>
              </td>
              <td>{vuln.date}</td>
              <td>
                <Link to={`/app/vulnerabilities/${vuln.id}`} className={styles.actionBtn}>
                  <Eye size={18} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VulnTable;
