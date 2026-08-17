import { type LucideIcon } from 'lucide-react';
import { cn } from '@/shared/util';

interface CheckButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  isChecked?: boolean;
  Icon: LucideIcon;
  className?: string;
}

export function CheckButton({
  isChecked,
  Icon,
  className,
  ...props
}: CheckButtonProps) {
  return (
    <button
      aria-label="Check Button"
      title="Check Button"
      {...props}
      className={cn(
        'size-6 border-2 rounded-lg flex items-center justify-center cursor-pointer  transition-all ease-in-out duration-300 ',
        isChecked
          ? 'bg-flame border-flame'
          : 'bg-transparent  border-surface2 hover:bg-surface2',
        className,
      )}
    >
      <Icon
        strokeWidth={4}
        className={cn('size-3', isChecked ? 'text-surface' : 'hidden')}
      />
    </button>
  );
}
