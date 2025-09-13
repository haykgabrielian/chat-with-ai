import React, { ReactNode, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { darkTheme, lightTheme } from '@/helpers/themes';
import { ThemeToggleContext } from '@/context//ThemeContext';

const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (!savedTheme) {
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    } else {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      localStorage.setItem('theme', !prev ? 'dark' : 'light');
      return !prev;
    });
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <ThemeToggleContext.Provider value={{ isDarkMode, toggleTheme }}>
        {children}
      </ThemeToggleContext.Provider>
    </ThemeProvider>
  );
};

export default AppThemeProvider;
