import { TaskGroup } from '@/features/routine/components/TaskGroup';
import type { Routine } from '@/features/routine/types/routine.domain.type';
import { AddGroupButton } from './AddGroupButton';
import { useEditMode } from '@/context/EditModeContext';
import { cn } from '@/shared/util';
interface Props {
  routine: Routine;
}

export function Routine({ routine }: Props) {
  const { isEditMode } = useEditMode();

  if (routine.groups.length === 0) {
    return (
      <main className="w-full h-full flex flex-col p-4 text-muted">
        <AddGroupButton routineId={routine.id} />
      </main>
    );
  }

  return (
    <main className="w-full min-h-fit sm:max-h-135 flex flex-col gap-4 scrollbar-none rounded-xl border-surface2">
      {routine?.groups.map((group) => (
        <TaskGroup key={`${group.id}-${routine.id}`} group={group} />
      ))}

      <div
        className={cn(
          'grid h-full transition-all duration-500 ease-out',
          isEditMode
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden h-full">
          <AddGroupButton routineId={routine.id} />
        </div>
      </div>
    </main>
  );
}
