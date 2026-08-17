import { useState } from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { useUpdateTask, useDeleteTask } from '../hooks/useTasks';

interface Props {
  taskId: string;
  currentTitle: string;
}

export function TaskControls({ taskId, currentTitle }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(currentTitle);

  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTitle(currentTitle);
    setIsEditing(true);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!title.trim()) return;

    updateTask(
      { id: taskId, body: { title } },
      { onSuccess: () => setIsEditing(false) },
    );
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTitle(currentTitle);
    setIsEditing(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm(`Deleting "${currentTitle}"?`)) return;
    deleteTask(taskId);
  };

  if (isEditing) {
    return (
      <div
        className="flex items-center gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xs font-secondary bg-surface border-2 border-line rounded-lg px-2 py-1 outline-none"
        />
        <button
          onClick={handleSave}
          disabled={isUpdating}
          className="text-muted hover:text-ink"
        >
          <Check className="size-4" />
        </button>
        <button onClick={handleCancel} className="text-muted hover:text-ink">
          <X className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={handleEdit}
        className="text-muted hover:text-ink"
        aria-label="Editar task"
      >
        <Pencil className="size-3.5" />
      </button>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-muted hover:text-red-400"
        aria-label="Excluir task"
      >
        <Trash2 className="size-3.5" />
      </button>
    </div>
  );
}
