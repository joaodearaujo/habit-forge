import { InlineEditField } from '@/features/routine/components/InlineEditField';
import { useDeleteTask, useUpdateTask } from '../hooks/useTasks';

interface Props {
  taskId: string;
  currentTitle: string;
}

export function TaskControls({ taskId, currentTitle }: Props) {
  const { mutate: updateTask } = useUpdateTask();
  const { mutate: deleteTask } = useDeleteTask();

  return (
    <InlineEditField
      currentTitle={currentTitle}
      onSave={(title, onSuccess) =>
        updateTask({ id: taskId, body: { title } }, { onSuccess })
      }
      onDelete={() => {
        if (window.confirm(`Deleting "${currentTitle}"?`)) deleteTask(taskId);
      }}
      editLabel="Edit task"
      deleteLabel="Delete task"
    />
  );
}
