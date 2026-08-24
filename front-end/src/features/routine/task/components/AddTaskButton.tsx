import { z } from 'zod';
import { CATEGORY_COLORS } from '@/constants/categoryColors';
import { cn } from '@/shared/util';
import { Field } from '@/components/ui/Form/Field';
import { FormInput } from '@/components/ui/Form/FormInput';
import { useCollapsibleForm } from '../../hooks/useCollapsibleForm';
import { CollapsibleFormShell } from '../../components/CollapsibleFormShell';
import type { Category, TaskCreatePayload } from '../types/task.domain.type';
import { useCreateTask } from '../hooks/useTasks';

const CATEGORIES = Object.keys(CATEGORY_COLORS) as Array<keyof typeof CATEGORY_COLORS>;
const taskFormSchema = z.object({
  title: z.string().trim().min(5, 'The title must be at least 5 characters long.').max(50, 'The title must be at most 50 characters long.'),
  category: z.string(),
  isCompleted: z.boolean(),
  isCore: z.boolean(),
});

type Props = { groupId: string };
type FormValues = z.infer<typeof taskFormSchema>;

export function AddTaskButton({ groupId }: Props) {
  const { mutate, isPending } = useCreateTask();
  const form = useCollapsibleForm<FormValues>({
    initialValues: { title: '', category: CATEGORIES[0], isCompleted: false, isCore: false },
    validate: (values) => {
      const result = taskFormSchema.safeParse(values);
      return result.success ? '' : result.error.issues[0]?.message ?? 'Invalid task.';
    },
    isPending,
    onSubmit: (values, onSuccess, onError) => {
      mutate({ groupId, ...values, category: values.category as Category } satisfies TaskCreatePayload, {
        onSuccess,
        onError: (error) => onError(error instanceof Error ? error.message : 'Something went wrong creating the task. Please try again.'),
      });
    },
  });

  return (
    <CollapsibleFormShell
      isExpanded={form.isExpanded}
      label="Task"
      onToggle={form.toggleOpen}
      onCancel={form.cancelForm}
      onSubmit={(e) => { e.preventDefault(); form.submit(); }}
      onKeyDown={form.handleKeyDown}
      onTransitionEnd={form.handleTransitionEnd}
      errorMessage={form.showError ? form.errorMessage : ''}
      errorId="task-title-error"
      isPending={isPending}
    >
      <div className="w-full flex gap-3">
        <div className="flex flex-col gap-2 w-full">
          <Field>
            <FormInput
              autoFocus={form.isExpanded}
              value={form.values.title}
              onChange={(e) => form.setField('title', e.target.value)}
              placeholder="Task title"
              invalid={form.showError}
              aria-describedby={form.showError ? 'task-title-error' : undefined}
            />
          </Field>
        </div>
        <div className="flex gap-3 h-fit items-center">
          <select
            value={form.values.category}
            onChange={(e) => form.setField('category', e.target.value)}
            className="text-xs font-secondary bg-surface border-2 border-line rounded-xl px-3 py-2 outline-none"
          >
            {CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
          <button
            type="button"
            role="checkbox"
            aria-checked={form.values.isCore}
            aria-label="Mark as core task"
            onClick={() => form.setField('isCore', !form.values.isCore)}
            className={cn('flex items-center justify-center size-4 border-[1.5px] border-flame rounded-sm cursor-pointer', form.values.isCore ? 'bg-flame' : 'bg-surface')}
          >
            <span className={cn('leading-none h-3.5', form.values.isCore ? 'text-surface' : 'hidden')}>★</span>
          </button>
          <label className="flex gap-1 items-center font-medium">Core</label>
        </div>
      </div>
    </CollapsibleFormShell>
  );
}
