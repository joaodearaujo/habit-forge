import { Check, Pencil, Trash2, X } from 'lucide-react';
import type { MouseEvent } from 'react';
import { useInlineEdit } from '../hooks/useInlineEdit';

interface Props {
  currentTitle: string;
  onSave: (title: string, onSuccess: () => void, onError: () => void) => void;
  onDelete?: () => void;
  deleteLabel?: string;
  editLabel?: string;
  inputClassName?: string;
}

export function InlineEditField({
  currentTitle,
  onSave,
  onDelete,
  deleteLabel = 'Delete',
  editLabel = 'Edit',
  inputClassName = '',
}: Props) {
  const edit = useInlineEdit({ currentValue: currentTitle, onSave });

  const stopPropagation = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
  };

  if (edit.isEditing) {
    return (
      <div
        className="flex items-center gap-2"
        onClick={stopPropagation}
      >
        <input
          autoFocus
          value={edit.value}
          onChange={(e) => edit.setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') edit.save();
            if (e.key === 'Escape') edit.cancelEditing();
          }}
          className={`text-xs font-secondary bg-surface border-2 border-line rounded-lg px-2 py-1 outline-none ${inputClassName}`}
        />
        <button
          type="button"
          onClick={edit.save}
          disabled={edit.isSaving}
          className="text-muted hover:text-ink disabled:opacity-50"
          aria-label="Salvar edição"
        >
          <Check className="size-4" />
        </button>
        <button
          type="button"
          onClick={edit.cancelEditing}
          className="text-muted hover:text-ink"
          aria-label="Cancelar edição"
        >
          <X className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={edit.startEditing}
        className="text-muted hover:text-ink"
        aria-label={editLabel}
      >
        <Pencil className="size-3.5" />
      </button>
      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            stopPropagation(e);
            onDelete();
          }}
          disabled={edit.isSaving}
          className="text-muted hover:text-red-400 disabled:opacity-50"
          aria-label={deleteLabel}
        >
          <Trash2 className="size-3.5" />
        </button>
      )}
    </div>
  );
}
