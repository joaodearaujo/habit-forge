import { CheckButton } from '@/components/ui/Buttons/CheckButton';
import { Dot } from '@/components/ui/icons/Dot';
import { Star } from '@/components/ui/icons/Star';
import { CATEGORY_COLORS, type CategoryKey } from '@/constants/categoryColors';
import { cn } from '@/shared/util';
import { Check } from 'lucide-react';
import type { MouseEvent } from 'react';
import { TaskControls } from './TaskControls';
import { ExpandButton } from '@/shared/components/ui/ExpandButton';
import type { Task } from '../types/task.domain.type';

interface Props {
  task: Task;
  isEditMode: boolean;
  isExpanded: boolean;
  onExpand: () => void;
  onCheck: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function TaskHeader({
  task,
  isEditMode,
  isExpanded,
  onExpand,
  onCheck,
}: Props) {
  const categoryColor =
    CATEGORY_COLORS[task.category as CategoryKey] || CATEGORY_COLORS.STUDY;

  return (
    <div className="w-full h-12 flex items-center justify-between p-4 gap-3 cursor-pointer">
      <Dot color={categoryColor} />

      <div className="flex-1 text-left flex items-center gap-2">
        <span
          className={cn(
            'transition-colors text-[13px] font-medium font-primary duration-300 capitalize ease-in-out leading-none',
            task.isCompleted
              ? 'line-through text-muted opacity-50'
              : 'text-ink',
          )}
        >
          {task.title}
        </span>

        {task.isCore && <Star />}
      </div>

      <div
        className={cn(
          'grid transition-all duration-500 ease-out',
          isEditMode
            ? 'grid-cols-[1fr] opacity-100'
            : 'grid-cols-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <TaskControls taskId={task.id} currentTitle={task.title} />
        </div>
      </div>

      <div
        className={cn(
          'grid transition-all duration-600 ease-out bg-transparent',
          !isEditMode
            ? 'grid-cols-[1fr] opacity-100'
            : 'grid-cols-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          {task.description && (
            <ExpandButton
              className="mr-2"
              onClick={onExpand}
              isExpanded={isExpanded}
            />
          )}

          <CheckButton
            Icon={Check}
            onClick={onCheck}
            isChecked={task.isCompleted}
          />
        </div>
      </div>
    </div>
  );
}
