import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Search, Filter, ShieldAlert } from 'lucide-react';
import VulnTable from '../../components/app/VulnTable';
import ChartWidget from '../../components/app/ChartWidget';
import styles from './Vulnerabilities.module.css';

const mockVulns = Array.from({ length: 15 }).map((_, i) => ({
  id: `VULN-00${i + 1}`,
  cve: `CVE-2024-${1000 + i}`,
  severity: i % 5 === 0 ? 'Critical' : i % 4 === 0 ? 'High' : i % 3 === 0 ? 'Medium' : i % 2 === 0 ? 'Low' : 'Info',
  service: i % 2 === 0 ? 'http (80/tcp)' : 'ssh (22/tcp)',
  target: i % 3 === 0 ? '192.168.1.1' : 'example.com',
  status: i % 4 === 0 ? 'Fixed' : i % 5 === 0 ? 'In Progress' : 'Open',
  date: `2026-09-2${8 - (i % 5)}`
}));

const vulnData = [
  { name: 'Critical', value: 3, color: '#ff4757' },
  { name: 'High', value: 3, color: '#ff7675' },
  { name: 'Medium', value: 3, color: '#ff9f43' },
  { name: 'Low', value: 3, color: '#feca57' },
  { name: 'Info', value: 3, color: '#00f0ff' },
];

const Vulnerabilities = () => {
  const { t } = useTranslation('vulnerabilities');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Vulnerabilidades</h1>
      </div>

      <div className={styles.summaryRow}>
        <div className={styles.chartWrapper}>
          <ChartWidget title="Distribución por Severidad">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={vulnData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {vulnData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: 'var(--text-secondary)' }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartWidget>
        </div>
        
        <div className={styles.statsWrapper}>
          <div className={styles.statCard}>
            <ShieldAlert size={40} className={styles.statIcon} />
            <div className={styles.statContent}>
              <span className={styles.statValue}>15</span>
              <span className={styles.statLabel}>Vulnerabilidades Totales</span>
            </div>
          </div>
          <div className={styles.statCardDanger}>
            <ShieldAlert size={40} className={styles.statIconDanger} />
            <div className={styles.statContent}>
              <span className={styles.statValueDanger}>6</span>
              <span className={styles.statLabelDanger}>Requieren Acción Inmediata (Alta/Crítica)</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.filterBar}>
        <div className={styles.searchBox}>
          <Search size={20} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Buscar por CVE, Servicio..." 
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <Filter size={16} />
            <select className={styles.select}>
              <option value="all">Severidad: Todas</option>
              <option value="critical">Crítica</option>
              <option value="high">Alta</option>
              <option value="medium">Media</option>
              <option value="low">Baja</option>
              <option value="info">Info</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <select className={styles.select}>
              <option value="all">Estado: Todos</option>
              <option value="open">Abierta</option>
              <option value="inprogress">En Progreso</option>
              <option value="fixed">Corregida</option>
            </select>
          </div>
        </div>
      </div>

      <VulnTable vulnerabilities={mockVulns} />
    </div>
  );
};

export default Vulnerabilities;
