// src/features/auth/components/RegisterForm.tsx
import { useState } from 'react';
import { registerSchema } from '../validation/authSchema';
import { useAuthForm } from '../hooks/useAuthForm';
import { AuthInput } from './AuthInput';
import { AuthHeader } from './AuthHeader';
import { AuthDivider } from './AuthDivider';
import { AuthSocialButton } from './AuthSocialButton';
import { LinkLogin } from './LinkLogin';

export function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { error, isLoading, hasAttemptedSubmit, showError, clearErrorOnChange, submit } =
    useAuthForm('v1/user/register', registerSchema);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit({ name, email, password });
  };

  return (
    <main className="w-full h-full flex flex-col gap-10 p-4 font-primary">
      <AuthHeader title="Register" actionLabel="registering" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative">
        <AuthInput
          id="name"
          label="Name"
          type="text"
          value={name}
          onChange={(v) => {
            setName(v);
            clearErrorOnChange();
          }}
          placeholder="Enter your name"
          showError={showError}
          hasAttemptedSubmit={hasAttemptedSubmit}
        />

        <AuthInput
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(v) => {
            setEmail(v);
            clearErrorOnChange();
          }}
          placeholder="Enter your email"
          showError={showError}
          hasAttemptedSubmit={hasAttemptedSubmit}
          describedById="register-form-error"
        />

        <AuthInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(v) => {
            setPassword(v);
            clearErrorOnChange();
          }}
          placeholder="********"
          showError={showError}
          hasAttemptedSubmit={hasAttemptedSubmit}
        />

        {showError && (
          <span
            id="register-form-error"
            role="alert"
            aria-live="polite"
            className="text-xs text-red font-secondary px-1 text-wrap"
          >
            {error}
          </span>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="bg-flame px-6 py-4 rounded-2xl font-secondary font-medium text-white cursor-pointer hover:bg-flame-dark hover:translate-y-1 active:translate-y-1.5 transition-all ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Registering...' : 'Connect'}
        </button>
      </form>

      <AuthDivider />

      <section className="w-full flex flex-col gap-4">
        <AuthSocialButton label="Sign in with Google" />
        <p className="text-xs text-ink">
          Already have an account?{' '}
          <LinkLogin to="/login">Login</LinkLogin>
        </p>
      </section>
    </main>
  );
}