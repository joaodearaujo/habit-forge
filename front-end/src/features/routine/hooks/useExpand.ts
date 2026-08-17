import { useState } from 'react';

export function useExpand(boolean: boolean) {
  const [isExpanded, setIsExpanded] = useState(boolean);

  const controlExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return { controlExpand, handleExpand, isExpanded };
}
