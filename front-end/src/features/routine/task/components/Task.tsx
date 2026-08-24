import type { MouseEvent } from 'react';
import { useEditMode } from '@/context/EditModeContext';
import { TaskContainer } from './TaskContainer';
import { TaskDescription } from './TaskDescription';
import { TaskHeader } from './TaskHeader';
import type { Task } from '../types/task.domain.type';
import { useToggleCompletion } from '../hooks/useTasks';
import { useExpand } from '@/shared/hooks/useExpand';

interface Props {
  task: Task;
}

export function Task({ task }: Props) {
  const { isEditMode } = useEditMode();
  const { isExpanded, controlExpand } = useExpand(false);
  const { controlCheck } = useToggleCompletion();

  const handleCheck = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    controlCheck(task.id);
  };                                

  return (
    <TaskContainer>
      <TaskHeader
        task={task}
        isEditMode={isEditMode}
        isExpanded={isExpanded}
        onExpand={controlExpand}
        onCheck={handleCheck}
      />

      <TaskDescription
        description={task.description}
        isExpanded={isExpanded}
      />
    </TaskContainer>
  );
}
