import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Contact.module.css';
import { Mail, MapPin, Github, Linkedin } from 'lucide-react';

const Contact = () => {
  const { t } = useTranslation('contact');
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'general', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: 'general', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Contacto</h1>
        <p className={styles.subtitle}>¿Interesado en pHound? Háblanos.</p>
      </div>

      <div className={styles.content}>
        <div className={styles.formContainer}>
          {submitted ? (
            <div className={styles.successMessage}>
              <h3>¡Mensaje Enviado!</h3>
              <p>Nos pondremos en contacto contigo pronto.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Nombre</label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={styles.input}
                  placeholder="Tu nombre"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Correo Electrónico</label>
                <input 
                  type="email" 
                  id="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={styles.input}
                  placeholder="tu@email.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject">Asunto</label>
                <select 
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className={styles.input}
                >
                  <option value="general">Pregunta General</option>
                  <option value="support">Soporte Técnico</option>
                  <option value="enterprise">Ventas / Enterprise</option>
                  <option value="academic">Colaboración Académica</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Mensaje</label>
                <textarea 
                  id="message" 
                  rows="5"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className={styles.textarea}
                  placeholder="¿Cómo podemos ayudarte?"
                ></textarea>
              </div>

              <button type="submit" className={styles.submitBtn}>
                Enviar Mensaje
              </button>
            </form>
          )}
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.infoCard}>
            <h3>Información de Contacto</h3>
            <p>El proyecto pHound es desarrollado como parte académica en la UPSIN.</p>
            
            <div className={styles.infoItem}>
              <MapPin className={styles.iconCyan} />
              <div>
                <strong>Universidad Politécnica de Sinaloa</strong>
                <p>C. Luis Donaldo Colosio Murrieta s/n<br/>Col. Predio Las Calaveras<br/>Mazatlán, Sinaloa, México. CP 82199</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <Mail className={styles.iconCyan} />
              <div>
                <strong>Email</strong>
                <p>contacto@phound.upsin.edu.mx (Simulado)</p>
              </div>
            </div>

            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialBtn}><Github /> GitHub</a>
              <a href="#" className={styles.socialBtn}><Linkedin /> LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
