/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: (e: React.MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDark((prev) => !prev);
    document.documentElement.classList.toggle('light');
  };

  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
}
