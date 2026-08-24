import { Routine } from '@/features/routine/routine/components/Routine';
import { useGetRoutine } from '../hooks/useRoutine';
import { Navigate, Route, Routes } from 'react-router-dom';

export function RoutineDisplay() {
  const { routines } = useGetRoutine();

  if (routines.length === 0) {
    return (
      <div className=" flex flex-col items-center justify-center border-line border-t border-b h-full rounded-xl overflow-y-auto p-4">
        <span className="font-secondary text-muted/50 text-xs">
          You don't have tasks yet. Create your first routine!
        </span>
      </div>
    );
  }

  return (
    <div className="border-line border-t border-b h-full rounded-xl overflow-y-auto p-4 scrollbar-none">
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`/routine/${routines[0].id}`} replace />}
        />
        {routines.map((routine) => (
          <Route
            path={`/routine/${routine.id}`}
            key={routine.id}
            element={<Routine routine={routine} />}
          />
        ))}
        <Route
          path="*"
          element={<Navigate to={`/routine/${routines[0].id}`} replace />}
        />
      </Routes>
    </div>
  );
}
