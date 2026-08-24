import { cn } from '@/shared/util';

type AuthInputProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  showError: boolean;
  hasAttemptedSubmit: boolean;
  error?: string;
  describedById?: string;
};

export function AuthInput({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  showError,
  hasAttemptedSubmit,
  describedById,
}: AuthInputProps) {
  return (
    <div className="flex-1 flex flex-col gap-2">
      <label htmlFor={id} className="leading-none text-left text-sm text-ink">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-invalid={showError}
        aria-describedby={showError ? describedById : undefined}
        className={cn(
          'h-12 rounded-2xl p-4 text-ink bg-surface border font-light',
          !hasAttemptedSubmit && 'border-line',
          hasAttemptedSubmit && (showError ? 'border-red' : 'border-green-500'),
        )}
      />
    </div>
  );
}