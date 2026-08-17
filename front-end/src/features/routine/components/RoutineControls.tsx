import { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';
import { useUpdateRoutine } from '../hooks/useRoutine';

interface Props {
  routineId: string;
  currentTitle: string;
}

export function RoutineControls({ routineId, currentTitle }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(currentTitle);

  const { mutate: updateRoutine, isPending: isUpdating } = useUpdateRoutine();

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setTitle(currentTitle);
    setIsEditing(true);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!title.trim()) return;

    updateRoutine(
      { id: routineId, body: { title } },
      { onSuccess: () => setIsEditing(false) },
    );
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setTitle(currentTitle);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div
        className="flex items-center gap-2"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-xs font-secondary bg-surface border-2 border-line rounded-lg px-2 py-1 outline-none w-20"
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
    <button
      onClick={handleEdit}
      className="text-muted hover:text-ink"
      aria-label="Editar rotina"
    >
      <Pencil className="size-3.5" />
    </button>
  );
}
