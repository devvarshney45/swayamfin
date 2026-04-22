import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('swayamfin_theme');
    return saved ? saved === 'dark' : true; // default dark
  });

  useEffect(() => {
    localStorage.setItem('swayamfin_theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark-site');
      document.documentElement.classList.remove('light-site');
    } else {
      document.documentElement.classList.add('light-site');
      document.documentElement.classList.remove('dark-site');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
