import { z } from 'zod';
import { useCreateRoutine } from '../hooks/useRoutine';
import { useCollapsibleForm } from '../../hooks/useCollapsibleForm';
import { CollapsibleFormShell } from '../../components/CollapsibleFormShell';
import { Field } from '@/components/ui/Form/Field';
import { FormInput } from '@/components/ui/Form/FormInput';

const routineFormSchema = z.object({
  title: z.string().trim().min(3, 'The title must be at least 3 characters long.').max(50, 'The title must be at most 50 characters long.'),
  groups: z.array(z.unknown()),
  description: z.string().optional(),
});

type Props = { routineCount: number };
type FormValues = z.infer<typeof routineFormSchema>;
const MAX_ROUTINES = 4;

export function AddRoutineButton({ routineCount }: Props) {
  const { mutate, isPending } = useCreateRoutine();
  const form = useCollapsibleForm<FormValues>({
    initialValues: { title: '', groups: [] },
    validate: (values) => {
      const result = routineFormSchema.safeParse(values);
      return result.success ? '' : result.error.issues[0]?.message ?? 'Invalid routine.';
    },
    isPending,
    onSubmit: (values, onSuccess, onError) => {
      mutate(values, {
        onSuccess,
        onError: (error) => onError(error instanceof Error ? error.message : 'Something went wrong creating the routine. Please try again.'),
      });
    },
  });

  return (
    <CollapsibleFormShell
      isExpanded={form.isExpanded}
      label="Routine"
      disabled={routineCount >= MAX_ROUTINES}
      disabledLabel="You've reached the maximum number of routines"
      onToggle={form.toggleOpen}
      onCancel={form.cancelForm}
      onSubmit={(e) => { e.preventDefault(); form.submit(); }}
      onKeyDown={form.handleKeyDown}
      onTransitionEnd={form.handleTransitionEnd}
      errorMessage={form.showError ? form.errorMessage : ''}
      errorId="routine-title-error"
      isPending={isPending}
    >
      <div className="w-full flex gap-3">
        <div className="flex flex-col gap-2 w-full">
          <Field>
            <FormInput
              autoFocus={form.isExpanded}
              value={form.values.title}
              onChange={(e) => form.setField('title', e.target.value)}
              placeholder="Routine title"
              invalid={form.showError}
              aria-describedby={form.showError ? 'routine-title-error' : undefined}
            />
          </Field>
        </div>
      </div>
    </CollapsibleFormShell>
  );
}
