import { Check } from 'lucide-react';
import { cn } from '@/shared/util';
import { ExpandButton } from './ExpandButton';
import { CheckButton } from '@/components/ui/Buttons/CheckButton';
import type { Task as TaskType } from '../types/routine.domain.type';
import { CATEGORY_COLORS, type CategoryKey } from '@/constants/categoryColors';
import { useEditMode } from '@/context/EditModeContext';
import { Star } from '@/components/ui/Star';
import { Dot } from '@/components/ui/Dot';
import { useExpand } from '@/features/routine/hooks/useExpand';
import { useState } from 'react';
import { useToggleIsCompletedTask } from '../hooks/useTasks';
import { TaskControls } from './TaskControls';

interface Props {
  task: TaskType;
}

export function Task({ task }: Props) {
  const categoryColor =
    CATEGORY_COLORS[task.category as CategoryKey] || CATEGORY_COLORS.STUDY;
  const { isEditMode } = useEditMode();
  const { isExpanded, controlExpand } = useExpand(false);

  const [isChecked, setIsChecked] = useState<boolean>(task.isCompleted);
  const { mutate } = useToggleIsCompletedTask();

  const controlCheck = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsChecked((prev) => !prev);

    toggleComplete({ isCompleted: !task.isCompleted });
  };

  const toggleComplete = (data: Partial<Omit<TaskType, 'id'>>) => {
    mutate(
      { id: task.id, body: data },
      {
        onSuccess: () => {},
        onError: (err) => {
          console.error('Update failed:', err);
          setIsChecked((prev) => !prev);
        },
      },
    );
  };

  return (
    <div className="pb-0.5 rounded-xl bg-surface2 overflow-hidden">
      <div className="w-full h-fit flex flex-col items-start bg-surface rounded-xl border-2 border-surface2 overflow-hidden">
        <div className="w-full h-12 flex items-center justify-between p-4 gap-3 cursor-pointer">
          <Dot color={categoryColor} />

          <div className="flex-1 text-left flex items-center gap-2">
            <span
              className={cn(
                'transition-colors text-[13px] font-medium font-primary duration-300 capitalize ease-in-out leading-none ',
                isChecked ? 'line-through text-muted opacity-50' : 'text-ink',
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
                  onClick={controlExpand}
                  isExpanded={isExpanded}
                />
              )}

              <CheckButton
                Icon={Check}
                onClick={controlCheck}
                isChecked={isChecked}
              />
            </div>
          </div>
        </div>

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
              {task.description && <p>{task.description}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
