import { ConfigProvider, theme as antdTheme } from 'antd';
import { createContext, type ReactNode, useEffect, useState } from 'react';

import { type Theme, THEME_LOCAL_STORAGE_KEY, type ThemeContextType, } from './types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export { ThemeContext };

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);
    return (savedTheme as Theme) || 'light';
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, theme);
    const root = document.documentElement; // <html>
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(`theme-${theme}`);
  }, [theme]);

  const lightTheme = {
    algorithm: antdTheme.defaultAlgorithm,
    token: {
      colorBgLayout: '#EFEFEF',
      colorPrimary: '#2f66ee',
      colorText: '#1A1A1A',
      colorBgContainer: '#ffffff',
    },
  };

  const darkTheme = {
    algorithm: antdTheme.darkAlgorithm,
    token: {
      colorBgLayout: '#EFEFEF',
      colorText: '#1A1A1A',
      colorPrimary: '#2f66ee',
      colorBgContainer: '#ffffff',
      colorPrimaryBg: '#2f66ee',
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ConfigProvider theme={theme === 'light' ? lightTheme : darkTheme}>
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
