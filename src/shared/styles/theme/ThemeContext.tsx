import { createContext, type ReactNode, useEffect, useState } from 'react';

import {
  type Theme,
  THEME_LOCAL_STORAGE_KEY,
  type ThemeContextType,
} from './types.ts';
import { ConfigProvider } from 'antd';

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

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ConfigProvider
        theme={{
          components: {
            Switch: {
              handleSize: 20,
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};
