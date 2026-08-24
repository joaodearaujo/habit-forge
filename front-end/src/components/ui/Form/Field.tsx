import type { ReactNode } from 'react';

interface FieldProps {
  label?: string;
  htmlFor?: string;
  error?: string;
  description?: string;
  children: ReactNode;
}

export function Field({
  label,
  htmlFor,
  error,
  description,
  children,
}: FieldProps) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      {label && (
        <label htmlFor={htmlFor} className="px-1 text-xs font-secondary font-medium text-muted">
          {label}
        </label>
      )}
      {children}
      {description && !error && (
        <span className="px-1 text-[11px] font-secondary text-muted">{description}</span>
      )}
      {error && (
        <span className="px-1 text-xs font-secondary text-red" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
