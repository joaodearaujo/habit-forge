// src/features/auth/components/AuthSocialButton.tsx
type AuthSocialButtonProps = {
  label: string;
};

export function AuthSocialButton({ label }: AuthSocialButtonProps) {
  return (
    <a
      href=""
      className="rounded-2xl px-6 py-4 bg-surface hover:bg-surface2 border text-ink border-line text-center border-b-6 hover:translate-y-0.5 active:translate-y-1 transition-all ease-in-out duration-300"
    >
      {label}
    </a>
  );
}