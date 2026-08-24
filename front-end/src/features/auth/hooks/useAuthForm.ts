// src/features/auth/hooks/useAuthForm.ts
import { useState } from 'react';
import { api } from '@/shared/api/api';
import type { UserResponse } from '@/shared/types/userResponse.type';
import { useAuth } from '@/context/AuthContext';

type ValidationResult = { isValid: boolean; errorMessage: string };

export function useAuthForm<TPayload extends Record<string, string>>(
  endpoint: string,
  validate: (payload: TPayload) => ValidationResult,
) {
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

    const validation = validate(payload);
    
    if (!validation.isValid) {
      setError(validation.errorMessage);
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      const user = await api.post<UserResponse, TPayload>(endpoint, payload);
      login(user);
    } catch (err) {
      console.error(err);
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return { error, isLoading, hasAttemptedSubmit, showError, clearErrorOnChange, submit };
}