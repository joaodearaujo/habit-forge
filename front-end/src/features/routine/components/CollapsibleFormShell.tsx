import type { ReactNode } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/shared/util';

interface Props {
  isExpanded: boolean;
  label: string;
  disabled?: boolean;
  disabledLabel?: string;
  onToggle: () => void;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onTransitionEnd: (e: React.TransitionEvent<HTMLDivElement>) => void;
  errorMessage?: string;
  errorId: string;
  isPending: boolean;
  children: ReactNode;
}

export function CollapsibleFormShell({
  isExpanded,
  label,
  disabled,
  disabledLabel,
  onToggle,
  onCancel,
  onSubmit,
  onKeyDown,
  onTransitionEnd,
  errorMessage,
  errorId,
  isPending,
  children,
}: Props) {
  const showError = Boolean(errorMessage);

  return (
    <div className="flex flex-col mb-2">
      <div
        className={cn(
          'grid transition-all duration-500 ease-out',
          !isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <button
            type="button"
            onClick={onToggle}
            disabled={disabled}
            className="flex items-center gap-2 text-xs cursor-pointer font-secondary text-muted border border-dashed border-line rounded-xl px-3 py-2 hover:border-edit hover:text-edit transition-all duration-300 disabled:border-line disabled:text-muted/20"
          >
            <Plus className="size-4" />
            {disabled ? disabledLabel ?? label : label}
          </button>
        </div>
      </div>

      <div
        className={cn(
          'grid h-full w-full transition-all duration-500 ease-out',
          isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
        onTransitionEnd={onTransitionEnd}
      >
        <div className="overflow-hidden">
          <form onSubmit={onSubmit} onKeyDown={onKeyDown} className="flex flex-col items-center gap-1">
            {children}

            <div
              className={cn(
                'grid w-full transition-all duration-500 ease-in-out',
                showError ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <span
                  id={errorId}
                  role="alert"
                  aria-live="polite"
                  className="text-xs text-red font-secondary px-1 text-wrap"
                >
                  {errorMessage}
                </span>
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
                onClick={onCancel}
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
