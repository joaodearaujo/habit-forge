import { useLocation } from 'react-router-dom';
import { SetRoutineButton } from '../../../components/ui/Buttons/SetRoutineButton';
import { useGetRoutine } from '../hooks/useRoutine';
import { AddRoutineButton } from './AddRoutineButton';
import { useEditMode } from '@/context/EditModeContext';
import { cn } from '@/shared/util';

export function RoutineNav() {
  const location = useLocation();
  const { routines } = useGetRoutine();
  const { isEditMode } = useEditMode();

  if (routines.length === 0) {
    return (
      <div className="flex gap-4">
        <AddRoutineButton />
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-21 flex w-full gap-2">
        {routines.map((routine) => (
          <SetRoutineButton
            routineId={routine.id}
            key={routine.id}
            title={routine.title}
            tasks={routine.groups.flatMap((group) => group.tasks)}
            isActive={location.pathname === `/${routine?.title}`}
          />
        ))}
      </div>

      <div
        className={cn(
          'grid transition-all duration-500 ease-out',
          isEditMode
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden h-full">
          <AddRoutineButton />
        </div>
      </div>
    </div>
  );
}
