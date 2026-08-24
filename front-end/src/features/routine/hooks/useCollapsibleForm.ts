import { useState } from 'react';
import type { KeyboardEvent } from 'react';

type FormState = 'closed' | 'open' | 'closing';

type SubmitCallbacks = {
  onSuccess: () => void;
  onError: (message: string) => void;
};

interface Options<TValues> {
  initialValues: TValues;
  validate: (values: TValues) => string;
  isPending: boolean;
  onSubmit: (values: TValues, onSuccess: () => void, onError: (message: string) => void) => void;
}

export function useCollapsibleForm<TValues>({
  initialValues,
  validate,
  isPending,
  onSubmit,
}: Options<TValues>) {
  const [state, setState] = useState<FormState>('closed');
  const [values, setValues] = useState<TValues>(initialValues);
  const [errorMessage, setErrorMessage] = useState('');

  const reset = () => {
    setValues(initialValues);
    setErrorMessage('');
  };

  const toggleOpen = () => {
    if (isPending) return;
    setErrorMessage('');
    setState((current) => (current === 'closed' ? 'open' : 'closing'));
  };

  const cancelForm = () => {
    if (isPending) return;
    reset();
    setState('closing');
  };

  const setField = <K extends keyof TValues>(field: K, value: TValues[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrorMessage('');
  };

  const submit = () => {
    if (isPending) return;

    const validationError = validate(values);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const callbacks: SubmitCallbacks = {
      onSuccess: () => {
        reset();
        setState('closing');
      },
      onError: (message) => {
        setErrorMessage(message);
      },
    };

    onSubmit(values, callbacks.onSuccess, callbacks.onError);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && !isPending) {
      event.preventDefault();
      cancelForm();
    }
  };

  const handleTransitionEnd = () => {
    if (state === 'closing') setState('closed');
  };

  return {
    isExpanded: state !== 'closed',
    state,
    values,
    errorMessage,
    showError: Boolean(errorMessage),
    toggleOpen,
    cancelForm,
    setField,
    submit,
    handleKeyDown,
    handleTransitionEnd,
  };
}
