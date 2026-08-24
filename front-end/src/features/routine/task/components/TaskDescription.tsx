import { cn } from '@/shared/util';

interface Props {
  description: string | null;
  isExpanded: boolean;
}

export function TaskDescription({ description, isExpanded }: Props) {
  return (
    <div
      className={cn(
        'grid transition-all duration-500 ease-out',
        isExpanded
          ? 'grid-rows-[1fr] opacity-100'
          : 'grid-rows-[0fr] opacity-0',
      )}
    >
      <div className="overflow-hidden">
        <div className="text-xs w-full text-left text-muted leading-5 pr-3.5 pb-3.5 pl-8">
          {description && <p>{description}</p>}
        </div>
      </div>
    </div>
  );
}
