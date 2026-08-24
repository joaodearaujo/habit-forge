// src/features/auth/components/LoginForm.tsx
import { useState } from 'react';
import { loginSchema } from '../validation/authSchema';
import { useAuthForm } from '../hooks/useAuthForm';
import { AuthInput } from './AuthInput';
import { AuthHeader } from './AuthHeader';
import { AuthDivider } from './AuthDivider';
import { AuthSocialButton } from './AuthSocialButton';
import { LinkLogin } from './LinkLogin';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { error, isLoading, hasAttemptedSubmit, showError, clearErrorOnChange, submit } =
    useAuthForm('v1/auth/login', loginSchema);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit({ email, password });
  };

  return (
    <main className="w-full h-full flex flex-col gap-10 p-4 font-primary">
      <AuthHeader title="Log in" actionLabel="logging in" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative">
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
          describedById="login-form-error"
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
            id="login-form-error"
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
          {isLoading ? 'Logging in...' : 'Connect'}
        </button>
      </form>

      <div className="flex items-center justify-between text-sm">
        <div className="flex gap-2">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember" className="text-ink">Remember me</label>
        </div>
        <LinkLogin to="">Forgot Password</LinkLogin>
      </div>

      <AuthDivider />

      <section className="w-full flex flex-col gap-4">
        <AuthSocialButton label="Log in with Google" />
        <p className="text-xs text-ink">
          Don't have an account?{' '}
          <LinkLogin to="/register">Create account</LinkLogin>
        </p>
      </section>
    </main>
  );
}