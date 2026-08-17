import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { useDeleteTask } from './useTasks';
import { api } from '../../../shared/api/api';

vi.mock('../api/api');

function createWrapper() {
  const queryClient = new QueryClient();
  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

describe('useDeleteTask', () => {
  it('calls api.delete with the task resource and the given id', async () => {
    vi.mocked(api.delete).mockResolvedValue(undefined);

    const { result } = renderHook(() => useDeleteTask(), {
      wrapper: createWrapper(),
    });
    result.current.mutate('task-id-123');

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(api.delete).toHaveBeenCalledWith('v1/task', 'task-id-123');
  });
});
