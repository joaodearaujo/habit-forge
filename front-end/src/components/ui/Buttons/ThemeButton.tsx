import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/shared/util';
import { Moon, Sun } from 'lucide-react';
import { DefaultButton } from './DefaultButton';

export function ThemeButton() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <DefaultButton
      onClick={toggleTheme}
      Icon={isDark ? Moon : Sun}
      label="Toggle theme"
      classNameIcon={cn(
        'transition-all duration-600 ease-in-out',
        'group-active:rotate-360',
        isDark
          ? 'text-purple group-hover:text-purple/80 group-hover:rotate-360'
          : 'text-amber group-hover:text-amber/80 group-hover:rotate-180',
      )}
    />
  );
}
