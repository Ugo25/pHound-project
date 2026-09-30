import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import styles from './ThemeSwitcher.module.css';

const ThemeSwitcher = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className={styles.button} aria-label="Toggle theme">
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeSwitcher;
