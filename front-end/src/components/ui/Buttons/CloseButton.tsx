import { cn } from '@/shared/util';
import { X } from 'lucide-react';

interface Props extends React.ComponentPropsWithoutRef<'button'> {
  className?: string;
}

export function CloseButton({ className, ...props }: Props) {
  return (
    <button
      {...props}
      className={cn(
        'size-fit items-center justify-center flex text-ink cursor-pointer hover:text-red transition-colors duration-300 ease-in-out',
        className,
      )}
    >
      <X strokeWidth={3} className="size-3" />
    </button>
  );
}
