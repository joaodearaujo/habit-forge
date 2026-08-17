import { useState } from 'react';
import { api } from '@/shared/api/api';
import { ThemeButton } from '@/components/ui/Buttons/ThemeButton';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import type { UserResponse } from '@/shared/types/userResponse.type';
import { cn } from '@/shared/util';
import { validateLoginFields } from '../validation/authSchema';

export function LoginForm() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const showError = hasAttemptedSubmit && error.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    const validation = validateLoginFields(email, password);

    if (!validation.isValid) {
      setError(validation.errorMessage);
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const user = await api.post<
        UserResponse,
        { email: string; password: string }
      >('v1/auth/login', { email, password });
      login(user);
    } catch (err) {
      console.error(err);
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full h-full flex flex-col gap-10 p-4 font-primary">
      <section className="flex justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-medium text-left text-ink">Log in</h1>
          <p className="text-sm text-left text-ink">
            By logging in, you agree to our{' '}
            <a
              className="font-medium text-ink hover:underline cursor-pointer"
              href="#"
            >
              Terms Of Use
            </a>
          </p>
        </div>
        <ThemeButton />
      </section>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative">
        <div className="flex-1 flex flex-col gap-2">
          <label
            htmlFor="email"
            className="leading-none text-left text-sm text-ink"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (showError) setError('');
            }}
            placeholder="Your email"
            aria-invalid={showError}
            aria-describedby={showError ? 'login-form-error' : undefined}
            className={cn(
              'h-12 rounded-2xl p-4 text-ink bg-surface border font-light ',
              !hasAttemptedSubmit && 'border-line',
              hasAttemptedSubmit && (error ? 'border-red' : 'border-green-500'),
            )}
          />
        </div>

        <div className="flex-1 flex flex-col gap-2 shrink-0">
          <label
            htmlFor="password"
            className="leading-none text-left text-sm text-ink"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (showError) setError('');
            }}
            placeholder="Your password"
            aria-invalid={showError}
            className={cn(
              'h-12 rounded-2xl p-4 text-ink bg-surface border font-light "',
              !hasAttemptedSubmit && 'border-line',
              hasAttemptedSubmit && (error ? 'border-red' : 'border-green-500'),
            )}
          />
        </div>

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
          className="bg-orange-400 px-6 py-4 rounded-2xl font-secondary font-medium text-white cursor-pointer hover:bg-orange-500 hover:translate-y-1 active:translate-y-1.5 transition-all ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Logging in...' : 'Connect'}
        </button>
      </form>

      <div className="flex w-full items-center gap-3">
        <hr className="flex-1 text-line" />
        <span className="text-ink">Or</span>
        <hr className="flex-1 text-line" />
      </div>

      <section className="w-full flex flex-col gap-4">
        <a
          href=""
            className="rounded-2xl px-6 py-4 bg-surface hover:bg-surface2 border text-ink border-line text-center border-b-6 hover:translate-y-0.5 active:translate-y-1 transition-all ease-in-out duration-300"
          >
          Sign in with Google
        </a>
        <p className="text-xs text-ink">
          Don't you have an account?{' '}
          <Link
            className="font-medium text-ink hover:underline cursor-pointer"
            to=""
          >
            Click here
          </Link>
        </p>
      </section>
    </main>
  );
}
