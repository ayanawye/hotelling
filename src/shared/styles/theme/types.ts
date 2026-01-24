export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const THEME_LOCAL_STORAGE_KEY = 'app-theme';
