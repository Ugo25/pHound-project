import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Globe, Server, MapPin, Database, ChevronDown, ChevronUp, Download } from 'lucide-react';
import styles from './OsintModule.module.css';

const mockOsintData = {
  whois: {
    registrant: 'Contact Privacy Inc. Customer 01100000',
    org: 'Contact Privacy Inc.',
    created: '1995-08-14',
    expires: '2025-08-13',
    updated: '2023-08-14',
    nameservers: ['a.iana-servers.net', 'b.iana-servers.net']
  },
  dns: [
    { type: 'A', value: '93.184.216.34' },
    { type: 'AAAA', value: '2606:2800:220:1:248:1893:25c8:1946' },
    { type: 'MX', value: 'No MX records' },
    { type: 'TXT', value: 'v=spf1 -all' },
    { type: 'NS', value: 'a.iana-servers.net' }
  ],
  geoip: {
    country: 'United States',
    countryCode: 'US',
    city: 'Norwell',
    isp: 'Edgecast Inc.',
    asNumber: 'AS15133',
    lat: '42.1508',
    lon: '-70.8228'
  },
  subdomains: [
    { name: 'www.example.com', ip: '93.184.216.34', status: 'Active' },
    { name: 'api.example.com', ip: '93.184.216.35', status: 'Active' },
    { name: 'mail.example.com', ip: '-', status: 'Inactive' },
    { name: 'dev.example.com', ip: '104.21.5.12', status: 'Active' },
    { name: 'staging.example.com', ip: '104.21.5.13', status: 'Active' }
  ]
};

const SectionCard = ({ title, icon: Icon, children, defaultExpanded = true }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className={styles.sectionCard}>
      <div 
        className={styles.sectionHeader} 
        onClick={() => setExpanded(!expanded)}
      >
        <div className={styles.sectionTitle}>
          <Icon size={20} className={styles.sectionIcon} />
          <h3>{title}</h3>
        </div>
        <button className={styles.expandBtn}>
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      {expanded && (
        <div className={styles.sectionContent}>
          {children}
        </div>
      )}
    </div>
  );
};

const OsintModule = () => {
  const { t } = useTranslation('osint');
  const [target, setTarget] = useState('example.com');
  const [hasSearched, setHasSearched] = useState(true); // default true for mock
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setHasSearched(true);
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Inteligencia OSINT</h1>
        {hasSearched && (
          <button className={styles.exportBtn}>
            <Download size={18} /> Exportar JSON
          </button>
        )}
      </div>

      <div className={styles.searchCard}>
        <div className={styles.searchWrapper}>
          <div className={styles.searchInputWrapper}>
            <Globe size={24} className={styles.searchIcon} />
            <input 
              type="text" 
              className={styles.searchInput} 
              placeholder="Dominio o IP (ej. example.com)"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
          </div>
          <button 
            className={styles.searchBtn} 
            onClick={handleSearch}
            disabled={!target || loading}
          >
            {loading ? 'Analizando...' : 'Analizar'}
          </button>
        </div>
        
        <div className={styles.quickModules}>
          <button className={`${styles.moduleBtn} ${styles.active}`}>WHOIS</button>
          <button className={`${styles.moduleBtn} ${styles.active}`}>DNS</button>
          <button className={`${styles.moduleBtn} ${styles.active}`}>GeoIP</button>
          <button className={`${styles.moduleBtn} ${styles.active}`}>Subdominios</button>
        </div>
      </div>

      {loading && (
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Recolectando información de fuentes públicas...</p>
        </div>
      )}

      {hasSearched && !loading && (
        <div className={styles.resultsGrid}>
          <div className={styles.resultsCol}>
            <SectionCard title="Información WHOIS" icon={Database}>
              <div className={styles.kvList}>
                <div className={styles.kvItem}>
                  <span className={styles.kvKey}>Registrant:</span>
                  <span className={styles.kvValue}>{mockOsintData.whois.registrant}</span>
                </div>
                <div className={styles.kvItem}>
                  <span className={styles.kvKey}>Organización:</span>
                  <span className={styles.kvValue}>{mockOsintData.whois.org}</span>
                </div>
                <div className={styles.kvItem}>
                  <span className={styles.kvKey}>Creado:</span>
                  <span className={styles.kvValue}>{mockOsintData.whois.created}</span>
                </div>
                <div className={styles.kvItem}>
                  <span className={styles.kvKey}>Expira:</span>
                  <span className={styles.kvValue}>{mockOsintData.whois.expires}</span>
                </div>
                <div className={styles.kvItem}>
                  <span className={styles.kvKey}>Actualizado:</span>
                  <span className={styles.kvValue}>{mockOsintData.whois.updated}</span>
                </div>
                <div className={styles.kvItem}>
                  <span className={styles.kvKey}>Name Servers:</span>
                  <span className={styles.kvValue}>
                    {mockOsintData.whois.nameservers.join(', ')}
                  </span>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Ubicación (GeoIP)" icon={MapPin}>
              <div className={styles.geoGrid}>
                <div className={styles.kvList}>
                  <div className={styles.kvItem}>
                    <span className={styles.kvKey}>País:</span>
                    <span className={styles.kvValue}>{mockOsintData.geoip.country} 🇺🇸</span>
                  </div>
                  <div className={styles.kvItem}>
                    <span className={styles.kvKey}>Ciudad:</span>
                    <span className={styles.kvValue}>{mockOsintData.geoip.city}</span>
                  </div>
                  <div className={styles.kvItem}>
                    <span className={styles.kvKey}>ISP:</span>
                    <span className={styles.kvValue}>{mockOsintData.geoip.isp}</span>
                  </div>
                  <div className={styles.kvItem}>
                    <span className={styles.kvKey}>ASN:</span>
                    <span className={styles.kvValue}>{mockOsintData.geoip.asNumber}</span>
                  </div>
                  <div className={styles.kvItem}>
                    <span className={styles.kvKey}>Coordenadas:</span>
                    <span className={styles.kvValue}>{mockOsintData.geoip.lat}, {mockOsintData.geoip.lon}</span>
                  </div>
                </div>
                <div className={styles.mapPlaceholder}>
                  Map View
                </div>
              </div>
            </SectionCard>
          </div>

          <div className={styles.resultsCol}>
            <SectionCard title="Registros DNS" icon={Server}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOsintData.dns.map((record, i) => (
                    <tr key={i}>
                      <td className={styles.typeCell}>{record.type}</td>
                      <td className={styles.valueCell}>{record.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </SectionCard>

            <SectionCard title="Subdominios Encontrados" icon={Globe}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Subdominio</th>
                    <th>IP</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {mockOsintData.subdomains.map((sub, i) => (
                    <tr key={i}>
                      <td className={styles.valueCell}>{sub.name}</td>
                      <td className={styles.ipCell}>{sub.ip}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${sub.status === 'Active' ? styles.statusActive : styles.statusInactive}`}>
                          {sub.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </SectionCard>
          </div>
        </div>
      )}
    </div>
  );
};

export default OsintModule;
