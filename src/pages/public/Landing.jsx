import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { 
  Clock, Puzzle, AlertTriangle, 
  Globe, Scan, Brain, FileText, 
  Database, Container, Monitor, ChevronRight 
} from 'lucide-react';
import styles from './Landing.module.css';

const Typewriter = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prevText => prevText + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}<span className={styles.cursor}>|</span></span>;
};

const AnimatedCounter = ({ end, suffix = '', duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
};

const Landing = () => {
  const { t } = useTranslation('landing');

  const team = [
    { name: 'Hugo Acosta', role: 'Desarrollador Backend & Ciberseguridad' },
    { name: 'Camacho Nolberto', role: 'Arquitecto de Sistemas' },
    { name: 'Rios Ingrit', role: 'Desarrolladora Frontend' },
    { name: 'Johany González', role: 'Analista de Seguridad & IA' }
  ];

  return (
    <div className={styles.container}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>{t('hero.title', 'pHound')}</h1>
          <h2 className={styles.subtitle}>{t('hero.subtitle', 'Suite integrada de auditoría de ciberseguridad')}</h2>
          <div className={styles.typewriter}>
            <Typewriter text="OSINT • Escaneo Activo • IA • Docker" delay={100} />
          </div>
          <div className={styles.heroButtons}>
            <Link to="/register" className={styles.btnPrimary}>
              {t('hero.cta.primary', 'Comenzar Ahora')}
            </Link>
            <Link to="/docs" className={styles.btnSecondary}>
              {t('hero.cta.secondary', 'Ver Documentación')}
            </Link>
          </div>
        </div>

      </section>

      {/* PROBLEM SECTION */}
      <section className={styles.problem}>
        <h2 className={styles.sectionTitle}>{t('problem.title', 'El Problema')}</h2>
        <div className={styles.grid3}>
          <div className={styles.card}>
            <Clock className={styles.iconRed} size={40} />
            <h3>{t('problem.card1.title', '40% del tiempo perdido')}</h3>
            <p>{t('problem.card1.desc', 'Los auditores invierten hasta el 40% de su tiempo en tareas de limpieza y correlación de datos.')}</p>
          </div>
          <div className={styles.card}>
            <Puzzle className={styles.iconOrange} size={40} />
            <h3>{t('problem.card2.title', '10+ herramientas fragmentadas')}</h3>
            <p>{t('problem.card2.desc', 'Nmap, Gobuster, Nikto, WHOIS... cada una con formatos incompatibles.')}</p>
          </div>
          <div className={styles.card}>
            <AlertTriangle className={styles.iconYellow} size={40} />
            <h3>{t('problem.card3.title', 'Fatiga de alertas')}</h3>
            <p>{t('problem.card3.desc', 'Miles de líneas de resultados sin clasificar. Las vulnerabilidades críticas se pierden en el ruido.')}</p>
          </div>
        </div>
      </section>

      {/* SOLUTION SECTION */}
      <section className={styles.solution}>
        <h2 className={styles.sectionTitle}>{t('solution.title', 'La Solución')}</h2>
        <div className={styles.flowDiagram}>
          <div className={styles.step}>
            <div className={styles.stepIcon}><Globe size={32} /></div>
            <h4>OSINT</h4>
            <p>Recolección pasiva</p>
          </div>
          <div className={styles.arrow}><ChevronRight size={24} /></div>
          <div className={styles.step}>
            <div className={styles.stepIcon}><Scan size={32} /></div>
            <h4>Escaneo</h4>
            <p>Análisis activo</p>
          </div>
          <div className={styles.arrow}><ChevronRight size={24} /></div>
          <div className={styles.step}>
            <div className={styles.stepIcon}><Brain size={32} /></div>
            <h4>IA</h4>
            <p>Correlación inteligente</p>
          </div>
          <div className={styles.arrow}><ChevronRight size={24} /></div>
          <div className={styles.step}>
            <div className={styles.stepIcon}><FileText size={32} /></div>
            <h4>Reporte</h4>
            <p>Salida ejecutiva</p>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>{t('features.title', 'Características')}</h2>
        <div className={styles.grid2x3}>
          <div className={styles.featureCard}>
            <Globe className={styles.iconCyan} size={32} />
            <h4>{t('features.f1.title', 'OSINT Pasivo')}</h4>
            <p>{t('features.f1.desc', 'WHOIS, DNS, GeoIP, subdominios')}</p>
          </div>
          <div className={styles.featureCard}>
            <Scan className={styles.iconCyan} size={32} />
            <h4>{t('features.f2.title', 'Escaneo Activo')}</h4>
            <p>{t('features.f2.desc', 'Nmap, Gobuster, Nikto integrados')}</p>
          </div>
          <div className={styles.featureCard}>
            <Database className={styles.iconCyan} size={32} />
            <h4>{t('features.f3.title', 'JSON Unificado')}</h4>
            <p>{t('features.f3.desc', 'Esquema normalizado único')}</p>
          </div>
          <div className={styles.featureCard}>
            <Brain className={styles.iconCyan} size={32} />
            <h4>{t('features.f4.title', 'Reportes IA')}</h4>
            <p>{t('features.f4.desc', 'Reportes ejecutivos automáticos')}</p>
          </div>
          <div className={styles.featureCard}>
            <Container className={styles.iconCyan} size={32} />
            <h4>{t('features.f5.title', 'Docker')}</h4>
            <p>{t('features.f5.desc', 'Aislamiento total por contenedores')}</p>
          </div>
          <div className={styles.featureCard}>
            <Monitor className={styles.iconCyan} size={32} />
            <h4>{t('features.f6.title', 'Dashboard Web')}</h4>
            <p>{t('features.f6.desc', 'Panel de control en tiempo real')}</p>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className={styles.stats}>
        <h2 className={styles.sectionTitle}>{t('stats.title', 'Ciberseguridad en México')}</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}><AnimatedCounter end={31} suffix="B+" /></div>
            <p>{t('stats.s1', 'intentos de ciberataques en México (2024)')}</p>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}><AnimatedCounter end={220} suffix="%" /></div>
            <p>{t('stats.s2', 'crecimiento en ataques de phishing')}</p>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}><AnimatedCounter end={65} suffix="%" /></div>
            <p>{t('stats.s3', 'empresas afectadas por vulnerabilidades')}</p>
          </div>
          <div className={styles.statItem}>
            <div className={styles.statNumber}><AnimatedCounter end={60} suffix="%" /></div>
            <p>{t('stats.s4', 'reducción de tiempo con pHound')}</p>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className={styles.team}>
        <h2 className={styles.sectionTitle}>{t('team.title', 'Nuestro Equipo')}</h2>
        <div className={styles.teamGrid}>
          {team.map((member, i) => (
            <div key={i} className={styles.teamCard}>
              <div className={styles.avatarPlaceholder}>
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h4>{member.name}</h4>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className={styles.ctaSection}>
        <h2>{t('cta.title', 'Protege tu infraestructura hoy')}</h2>
        <Link to="/register" className={styles.btnPrimaryLg}>
          {t('cta.button', 'Crear cuenta gratuita')}
        </Link>
      </section>
    </div>
  );
};

export default Landing;
