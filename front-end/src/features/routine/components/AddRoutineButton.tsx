import { useEffect, useRef, useState } from 'react';
import { Plus } from 'lucide-react';
import { useCreateRoutine, useGetRoutine} from '../hooks/useRoutine';
import { cn } from '@/shared/util';

type FormState = 'closed' | 'open' | 'closing';

const TITLE_MIN = 3;
const TITLE_MAX = 50;

export function AddRoutineButton() {
  const [state, setState] = useState<FormState>('closed');
  const [title, setTitle] = useState('');


  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending } = useCreateRoutine();


  const titleConditions = {
    emptyInput: !title.trim(),
    charactersLimit: title.length < TITLE_MIN || title.length > TITLE_MAX,
  };

  const isTitleInvalid =
    titleConditions.emptyInput || titleConditions.charactersLimit;
  const showValidationColor = hasAttemptedSubmit;

  const resetFields = () => {
    setTitle('');
    setHasAttemptedSubmit(false);
    setErrorMessage('');
  };

  const openForm = () => {
    setState('open');
  };

  const closeForm = () => {
    if (isPending) return;
    setState('closing');
  };

  const cancelForm = () => {
    resetFields();
    closeForm();
  };

  const toggleOpen = () => {
    if (state === 'open') {
      closeForm();
    } else if (state === 'closed') {
      openForm();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    if (titleConditions.emptyInput) {
      setErrorMessage('The title cannot be empty.');
      return;
    }

    if (titleConditions.charactersLimit) {
      setErrorMessage(
        `The title must be between ${TITLE_MIN} and ${TITLE_MAX} characters long.`,
      );
      return;
    }

    setErrorMessage('');

    mutate(
      { title, groups: [] },
      {
        onSuccess: () => {
          resetFields();
          closeForm();
        },
        onError: (error) => {
          setErrorMessage(
            error instanceof Error
              ? error.message
              : 'Something went wrong creating the routine. Please try again.',
          );
        },
      },
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      cancelForm();
    }
  };

  const isExpanded = state === 'open';
  const showError = hasAttemptedSubmit && errorMessage.length > 0;

  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [isExpanded]);

   const { routines } = useGetRoutine();

  return (
    <div className="flex flex-1 flex-col">
      <div
        className={cn(
          'grid transition-all duration-500 ease-out',
          !isExpanded
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="flex overflow-hidden">
          <button
            onClick={toggleOpen}
            disabled={routines.length > 3}
            className={cn(
              'flex items-center justify-center gap-2 text-xs w-full cursor-pointer font-secondary text-muted border border-dashed border-line rounded-xl px-3 py-2 hover:border-edit hover:text-edit transition-all duration-300 disabled:border-line disabled:text-muted/20',
            )}
          >
            <Plus className="size-4" />
            {routines.length > 3 ? "You've got the max routine quantity": 'Routine'}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'grid h-full w-full transition-all duration-500 ease-out',
          isExpanded
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0',
        )}
        // it waits the css animations to finish
        onTransitionEnd={(e) => {
          if (e.target === e.currentTarget && state === 'closing') {
            setState('closed');
          }
        }}
      >
        <div className="overflow-hidden">
          <form
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-full flex gap-3">
              <div className="flex flex-col gap-2 w-full">
                <input
                  ref={inputRef}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (showError) setErrorMessage('');
                  }}
                  placeholder="Routine title"
                  aria-invalid={showError}
                  aria-describedby={
                    showError ? 'routine-title-error' : undefined
                  }
                  className={cn(
                    'w-full text-xs font-secondary bg-surface border-2 rounded-xl px-3 py-2 outline-none transition-colors duration-200 text-ink',
                    !showValidationColor && 'border-line',
                    showValidationColor &&
                      (isTitleInvalid ? 'border-red' : 'border-green-500'),
                  )}
                />
                <div
                  className={cn(
                    'grid transition-all duration-500 ease-in-out',
                    showError
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0',
                  )}
                >
                  <div className="overflow-hidden">
                    <span
                      id="routine-title-error"
                      role="alert"
                      aria-live="polite"
                      className="text-xs text-red font-secondary px-1 text-wrap"
                    >
                      {errorMessage}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full gap-3">
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 text-xs font-secondary font-medium text-ink border-b-3 border-b-surface2 bg-surface rounded-xl px-3 py-2 cursor-pointer hover:bg-flame hover:text-white hover:border-flame-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-500 ease-in-out"
              >
                {isPending ? '...' : 'Create'}
              </button>
              <button
                type="button"
                onClick={cancelForm}
                disabled={isPending}
                className="flex-1 font-secondary text-xs px-3 py-2 rounded-xl border border-b-3 border-surface2 font-medium text-muted cursor-pointer hover:bg-red hover:border-red-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-500 ease-in-out"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
