import { useState } from 'react';

export function useForm() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleForm = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFormOpen((prev) => !prev);
  };

  return { isFormOpen, setIsFormOpen, handleForm };
}
