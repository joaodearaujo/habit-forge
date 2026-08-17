import { SquarePen } from 'lucide-react';
import { useEditMode } from '@/context/EditModeContext';
import { DefaultButton } from '@/components/ui/Buttons/DefaultButton';
import { cn } from '@/shared/util';
import { ThemeButton } from '../ui/Buttons/ThemeButton';
import { useTheme } from '@/context/ThemeContext';

export function Settings() {
  const { isEditMode, toggleEditMode } = useEditMode();
  const { isDark } = useTheme();

  return (
    <div className="w-fit flex flex-col gap-2 items-center justify-center">
      {/* Theme toggle */}
      <ThemeButton />

      {/* Edit mode toggle */}
      <DefaultButton
        onClick={toggleEditMode}
        Icon={SquarePen}
        label="Toggle edit mode"
        classNameIcon={cn(
          'group-hover:text-edit',
          isEditMode && 'text-edit',
          isDark && isEditMode && 'drop-shadow-sm drop-shadow-edit/50',
        )}
      />
    </div>
  );
}
