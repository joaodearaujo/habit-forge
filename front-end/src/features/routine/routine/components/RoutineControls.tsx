import { InlineEditField } from '../../components/InlineEditField';
import { useUpdateRoutine } from '../hooks/useRoutine';

interface Props {
  routineId: string;
  currentTitle: string;
}

export function RoutineControls({ routineId, currentTitle }: Props) {
  const { mutate: updateRoutine } = useUpdateRoutine();

  return (
    <InlineEditField
      currentTitle={currentTitle}
      onSave={(title, onSuccess) =>
        updateRoutine({ id: routineId, body: { title } }, { onSuccess, onError: onSuccess })
      }
      editLabel="Editar rotina"
      inputClassName="w-20"
    />
  );
}
