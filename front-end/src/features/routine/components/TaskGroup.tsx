import { Task } from '@/features/routine/components/Task';
import type { TaskGroup } from '@/features/routine/types/routine.domain.type';
import { useEditMode } from '@/context/EditModeContext';
import { ExpandButton } from '@/features/routine/components/ExpandButton';
import { useExpand } from '@/features/routine/hooks/useExpand';
import { cn } from '@/shared/util';
import { GroupControls } from '@/features/routine/components/GroupControls';
import { AddTaskButton } from './AddTaskButton';

interface Props {
  group: TaskGroup;
}

export function TaskGroup({ group }: Props) {
  const { isExpanded, controlExpand } = useExpand(true);
  const { isEditMode } = useEditMode();

  return (
    <div className="text-left text-muted text-xs flex flex-col gap-3 text-3 border-2 border-b-6 pt-2 px-3 bg-bg rounded-xl border-surface2">
      <div className="flex gap-2 items-center justify-between w-full mt-2 pb-2">
        <div className="flex w-full gap-4 items-center ">
          <h2 className="uppercase font-secondary font-semibold text-nowrap tracking- text-muted leading-none">
            {group.title}
          </h2>

          <div
            className={cn(
              'grid transition-all duration-500 ease-out',
              isEditMode
                ? 'grid-cols-[1fr] opacity-100'
                : 'grid-cols-[0fr] opacity-0',
            )}
          >
            <div className="overflow-hidden ">
              <GroupControls groupId={group.id} currentTitle={group.title} />
            </div>
          </div>
        </div>

        {group.tasks?.length > 0 && !isEditMode && (
          <ExpandButton onClick={controlExpand} isExpanded={isExpanded} />
        )}
      </div>

      <div
        className={cn(
          'grid transition-all duration-500 ease-out w-full',
          isExpanded
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden gap-3 flex flex-col">
          {group.tasks?.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      </div>

      <div
        className={cn(
          'grid transition-all duration-500 ease-out w-full',
          isEditMode || group.tasks.length === 0
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <AddTaskButton groupId={group.id} />
        </div>
      </div>
    </div>
  );
}
