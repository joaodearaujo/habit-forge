import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/shared/util';

interface Props {
  current: number;
  total: number;
}

export function ProgressRing({ current, total }: Props) {
  const { isDark } = useTheme();

  const label = 'Core';
  const size = 82;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = current / total;
  const offset = circumference * (1 - progress);
  const center = size / 2;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90 overflow-visible"
      >
        {/* Outer circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-surface2"
        />

        {/* Inner circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={cn(
            'transition-all duration-600 ease-out',
            current === 0 ? 'stroke-transparent' : 'stroke-flame',
            isDark &&
              current !== 0 &&
              'drop-shadow-[0_0_8px_rgba(255,122,61,0.6)]',
          )}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold leading-none text-ink font-secondary">
          {current}/{total}
        </span>
        <span className="mt-0.5 text-xs text-muted font-secondary">
          {label}
        </span>
      </div>
    </div>
  );
}
