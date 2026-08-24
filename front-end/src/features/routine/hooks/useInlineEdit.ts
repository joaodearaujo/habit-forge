import { useState } from 'react';

type SaveCallbacks = {
  onSuccess: () => void;
  onError: () => void;
};

interface Options {
  currentValue: string;
  onSave: (value: string, onSuccess: () => void, onError: () => void) => void;
}

export function useInlineEdit({ currentValue, onSave }: Options) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(currentValue);
  const [isSaving, setIsSaving] = useState(false);

  const startEditing = () => {
    setValue(currentValue);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    if (isSaving) return;
    setValue(currentValue);
    setIsEditing(false);
  };

  const save = () => {
    const nextValue = value.trim();
    if (!nextValue || isSaving) return;

    setIsSaving(true);

    const callbacks: SaveCallbacks = {
      onSuccess: () => {
        setIsSaving(false);
        setIsEditing(false);
      },
      onError: () => {
        setIsSaving(false);
      },
    };

    onSave(nextValue, callbacks.onSuccess, callbacks.onError);
  };

  return {
    isEditing,
    value,
    isSaving,
    setValue,
    startEditing,
    cancelEditing,
    save,
  };
}
