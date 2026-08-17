import { Link } from 'react-router-dom';
import { cn } from '@/shared/util';
import type { Task } from '@/features/routine/types/routine.domain.type';
import { useEditMode } from '@/context/EditModeContext';
import { CloseButton } from './CloseButton';
import { useDeleteRoutine } from '@/features/routine/hooks/useRoutine';
import { RoutineControls } from '@/features/routine/components/RoutineControls';

export interface Props {
  title: string;
  routineId: string;
  tasks: Task[];
  isActive: boolean;
}

export function SetRoutineButton({ title, tasks, routineId, isActive }: Props) {
  const { mutate } = useDeleteRoutine();
  const tasksQuantity = tasks?.length;
  const tasksDone = tasks.filter((task) => task.isCompleted).length;
  const { isEditMode } = useEditMode();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    mutate(routineId);
  };

  return (
    <Link
      to={`/${title}`}
      className={cn('group relative flex flex-1 items-center cursor-pointer')}
    >
      <div
        className={cn(
          'flex flex-1 border-2 group-hover:bg-surface/80 border-surface2 rounded-xl py-2 px-2.75 items-center cursor-pointer gap-2 text-sm capitalize font-secondary border-b-8 group-hover:border-b-7 group-active:border-b-2 transition-all duration-200 ease-in-out',
          isActive
            ? 'border-surface2 bg-surface text-ink hover:text-ink/80 font-bold'
            : 'bg-surface/50 text-muted/50 hover:text-muted/80 font-medium',
        )}
      >
        <div className="flex flex-col flex-1 items-center">
          <div className="flex-2 items-center capitalize gap-2">
            <span>{title}</span>
          </div>
          <span className="text-xs">
            {' '}
            {tasksDone ?? 0} / {tasksQuantity ?? 0}
          </span>
        </div>

        <div
          className={cn(
            'grid transition-all duration-500 ease-out ',
            isEditMode
              ? 'grid-cols-[1fr] opacity-100'
              : 'grid-cols-[0fr] opacity-0',
          )}
        >
          <div className="overflow-hidden flex gap-2 items-center">
            <RoutineControls routineId={routineId} currentTitle={title} />
            <CloseButton onClick={handleDelete} />
          </div>
        </div>
      </div>
    </Link>
  );
}
