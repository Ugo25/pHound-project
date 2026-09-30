import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './About.module.css';
import { Target, Eye, GitMerge, Award } from 'lucide-react';

const About = () => {
  const { t } = useTranslation('about');

  const team = [
    { name: 'Hugo Acosta', role: 'Desarrollador Backend & Ciberseguridad' },
    { name: 'Camacho Nolberto', role: 'Arquitecto de Sistemas' },
    { name: 'Rios Ingrit', role: 'Desarrolladora Frontend' },
    { name: 'Johany González', role: 'Analista de Seguridad & IA' }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.hero}>
        <h1 className={styles.title}>{t('hero.title', 'Sobre pHound')}</h1>
        <p className={styles.subtitle}>
          {t('hero.subtitle', 'Forjando el futuro de las auditorías de ciberseguridad desde UPSIN.')}
        </p>
      </header>

      <section className={styles.missionVision}>
        <div className={styles.card}>
          <Target className={styles.iconCyan} size={40} />
          <h2>{t('mission.title', 'Nuestra Misión')}</h2>
          <p>{t('mission.desc', 'Democratizar el acceso a auditorías de ciberseguridad profesionales mediante herramientas automatizadas, inteligentes y unificadas, reduciendo la brecha técnica para las empresas.')}</p>
        </div>
        <div className={styles.card}>
          <Eye className={styles.iconPurple} size={40} />
          <h2>{t('vision.title', 'Nuestra Visión')}</h2>
          <p>{t('vision.desc', 'Ser la suite de auditoría de código abierto estándar en la industria, reconocida por su innovación en la correlación de datos y generación de reportes asistidos por Inteligencia Artificial.')}</p>
        </div>
      </section>

      <section className={styles.philosophy}>
        <div className={styles.philosophyContent}>
          <h2>{t('philosophy.title', 'Filosofía de Interoperabilidad')}</h2>
          <GitMerge className={styles.iconGreen} size={48} />
          <p>{t('philosophy.p1', 'El ecosistema actual de ciberseguridad está altamente fragmentado. Cada herramienta habla su propio idioma, requiriendo que los auditores inviertan incontables horas en análisis manual.')}</p>
          <p>{t('philosophy.p2', 'En pHound creemos en la estandarización. Nuestra arquitectura está diseñada para consumir salidas dispares (Nmap, Gobuster, Nikto) y normalizarlas en un único esquema JSON estructurado. Esto permite que la IA correlacione vulnerabilidades que antes pasaban desapercibidas.')}</p>
        </div>
      </section>

      <section className={styles.timeline}>
        <h2 className={styles.sectionTitle}>{t('timeline.title', 'Fases de Desarrollo')}</h2>
        <div className={styles.timelineContainer}>
          <div className={styles.timelineItem}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineContent}>
              <h3>Fase 1: OSINT & Arquitectura</h3>
              <p>Diseño de arquitectura Docker y módulos de recolección pasiva (WHOIS, DNS).</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineContent}>
              <h3>Fase 2: Escaneo Activo</h3>
              <p>Integración de Nmap, Gobuster y Nikto. Parser unificado a JSON.</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.timelineDot}></div>
            <div className={styles.timelineContent}>
              <h3>Fase 3: IA & Reportes</h3>
              <p>Correlación de vulnerabilidades mediante LLMs y generación de PDFs.</p>
            </div>
          </div>
          <div className={styles.timelineItem}>
            <div className={styles.timelineDotActive}></div>
            <div className={styles.timelineContent}>
              <h3>Fase 4: Despliegue</h3>
              <p>Lanzamiento de plataforma web y API pública.</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.academic}>
        <div className={styles.academicCard}>
          <Award size={48} className={styles.iconYellow} />
          <h2>{t('academic.title', 'Contexto Académico')}</h2>
          <p>
            {t('academic.desc', 'Este proyecto fue desarrollado por estudiantes de la Universidad Politécnica de Sinaloa (UPSIN) en Mazatlán, Sinaloa (2026). Bajo la supervisión y asesoría de la Ing. Anabel Estrada Hernández, pHound representa la culminación de años de estudio en ingeniería de software y ciberseguridad.')}
          </p>
        </div>
      </section>

      <section className={styles.team}>
        <h2 className={styles.sectionTitle}>{t('team.title', 'El Equipo')}</h2>
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
    </div>
  );
};

export default About;
