import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Inicializar desde localStorage si existe, si no, light (blanco para empezar)
    const saved = localStorage.getItem('phound_theme');
    return saved || 'light';
  });

  useEffect(() => {
    // Aplicar el tema al documento (html tag)
    document.documentElement.setAttribute('data-theme', theme);
    // Guardar preferencia
    localStorage.setItem('phound_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark'
  };
};

export default useTheme;
