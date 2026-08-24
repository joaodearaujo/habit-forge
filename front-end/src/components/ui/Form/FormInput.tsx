import type { InputHTMLAttributes } from 'react';
import { cn } from '@/shared/util';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export function FormInput({ className, invalid, ...props }: FormInputProps) {
  return (
    <input
      {...props}
      aria-invalid={invalid || undefined}
      className={cn(
        'w-full text-xs font-secondary bg-surface border-2 border-line rounded-xl px-3 py-2 outline-none text-ink',
        'focus:border-edit transition-colors',
        invalid && 'border-red focus:border-red',
        className,
      )}
    />
  );
}
