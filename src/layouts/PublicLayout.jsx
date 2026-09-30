import React from 'react';

import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ConsentManager from '../components/common/ConsentManager';
import styles from './PublicLayout.module.css';

const PublicLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Navbar />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
      <ConsentManager />
    </div>
  );
};

export default PublicLayout;
