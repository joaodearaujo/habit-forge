import { type LucideIcon } from 'lucide-react';
import { cn } from '@/shared/util';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  classNameButton?: string;
  classNameIcon?: string;
  classNameWrapper?: string;
  label: string;
  Icon: LucideIcon;
}

export function DefaultButton({
  Icon,
  classNameButton,
  classNameIcon,
  label,
  ...props
}: Props) {
  return (
    <div className="size-12 shrink-0 flex items-center justify-center">
      <button
        {...props}
        aria-label={label}
        title={label}
        className={cn(
          'flex items-center justify-center rounded-xl size-fit outline-none p-2 group bg-surface border-2 border-surface2 cursor-pointer hover:bg-surface/50',
          'border-b-6 hover:border-b-4 active:border-b-2 transition-all ease-in-out duration-300',
          classNameButton,
        )}
      >
        <Icon
          strokeWidth={2.5}
          className={cn(
            'size-5 text-muted transition-all duration-600',
            classNameIcon,
          )}
        />
      </button>
    </div>
  );
}
