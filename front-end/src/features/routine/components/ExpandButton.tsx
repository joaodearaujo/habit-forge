import { ChevronDown } from 'lucide-react';
import { cn } from '@/shared/util';
interface ExpandButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  isExpanded: boolean;
  className?: string;
}

export function ExpandButton({
  isExpanded,
  className,
  ...props
}: ExpandButtonProps) {
  return (
    <button
      {...props}
      aria-label="Exapand content"
      title="Exapand contet"
      className="cursor-pointer size-fit flex border-none items-center justify-center group bg-transparent"
    >
      <ChevronDown
        strokeWidth={3}
        className={cn(
          'size-4 text-muted transition-transform duration-200 ease-in-out',
          isExpanded ? 'rotate-180' : 'rotate-0',
          className,
        )}
      />
    </button>
  );
}
