import { useState } from 'react';
import { z } from 'zod';
import { api } from '@/shared/api/api';
import type { UserResponse } from '@/shared/types/userResponse.type';
import { useAuth } from '@/context/AuthContext';

export function useAuthForm<TSchema extends z.ZodType>(
  endpoint: string,
  schema: TSchema,
) {
  type TPayload = z.infer<TSchema>;
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const showError = hasAttemptedSubmit && error.length > 0;

  const clearErrorOnChange = () => {
    if (showError) setError('');
  };

  const submit = async (payload: TPayload) => {
    setHasAttemptedSubmit(true);
    const result = schema.safeParse(payload);

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? 'Invalid form data.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const user = await api.post<UserResponse, TPayload>(endpoint, result.data);
      login(user);
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return { error, isLoading, hasAttemptedSubmit, showError, clearErrorOnChange, submit };
}
