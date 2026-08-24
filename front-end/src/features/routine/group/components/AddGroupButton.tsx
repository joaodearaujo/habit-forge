import { z } from 'zod';
import { useCreateGroup } from '../hooks/useGroup';
import { useCollapsibleForm } from '../../hooks/useCollapsibleForm';
import { CollapsibleFormShell } from '../../components/CollapsibleFormShell';
import { Field } from '@/components/ui/Form/Field';
import { FormInput } from '@/components/ui/Form/FormInput';

const groupFormSchema = z.object({
  title: z.string().trim().min(3, 'The title must be at least 3 characters long.').max(50, 'The title must be at most 50 characters long.'),
  description: z.string().max(150, 'The description must be at most 150 characters long.'),
});

type Props = { routineId: string };
type FormValues = z.infer<typeof groupFormSchema>;

export function AddGroupButton({ routineId }: Props) {
  const { mutate, isPending } = useCreateGroup();
  const form = useCollapsibleForm<FormValues>({
    initialValues: { title: '', description: '' },
    validate: (values) => {
      const result = groupFormSchema.safeParse(values);
      return result.success ? '' : result.error.issues[0]?.message ?? 'Invalid group.';
    },
    isPending,
    onSubmit: (values, onSuccess, onError) => {
      mutate({ routineId, ...values }, {
        onSuccess,
        onError: (error) => onError(error instanceof Error ? error.message : 'Something went wrong creating the group. Please try again.'),
      });
    },
  });

  return (
    <CollapsibleFormShell
      isExpanded={form.isExpanded}
      label="Group"
      onToggle={form.toggleOpen}
      onCancel={form.cancelForm}
      onSubmit={(e) => { e.preventDefault(); form.submit(); }}
      onKeyDown={form.handleKeyDown}
      onTransitionEnd={form.handleTransitionEnd}
      errorMessage={form.showError ? form.errorMessage : ''}
      errorId="group-form-error"
      isPending={isPending}
    >
      <div className="w-full flex flex-col gap-3">
        <Field>
          <FormInput
            autoFocus={form.isExpanded}
            value={form.values.title}
            onChange={(e) => form.setField('title', e.target.value)}
            placeholder="Group title"
            invalid={form.showError}
            aria-describedby={form.showError ? 'group-form-error' : undefined}
          />
        </Field>
        <Field>
          <FormInput
            value={form.values.description}
            onChange={(e) => form.setField('description', e.target.value)}
            placeholder="Group description"
          />
        </Field>
      </div>
    </CollapsibleFormShell>
  );
}
