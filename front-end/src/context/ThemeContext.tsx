import { createContext, useContext, useState } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: (e: React.MouseEvent) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: true,
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  const toggleTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDark((prev) => !prev);
    document.documentElement.classList.toggle('light');
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
