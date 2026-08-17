import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/shared/util';
interface Dot {
  color: string;
  className?: string;
}

export function Dot({ color, className }: Dot) {
  const { isDark } = useTheme();

  return (
    <div
      style={{
        backgroundColor: color,
        boxShadow: `${isDark ? `0 0 10px ${color}` : ''}`,
      }}

      className={cn(
        'size-1.5 rounded-full bg-green-400 shadow-green-500',
        className,
      )}
    />
  );
}
