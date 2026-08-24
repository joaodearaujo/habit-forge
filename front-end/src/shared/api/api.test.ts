import { afterEach, describe, expect, it, vi } from 'vitest';
import { ApiError, api, setUnauthorizedHandler } from './api';

describe('api client', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    setUnauthorizedHandler(undefined);
  });

  it('handles empty successful responses without calling json', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(null, { status: 204 })));
    await expect(api.delete('v1/task', 'task-id')).resolves.toBeUndefined();
  });

  it('parses standardized API errors and invokes the unauthorized handler', async () => {
    const unauthorized = vi.fn();
    setUnauthorizedHandler(unauthorized);
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ message: 'Session expired' }), {
          status: 401,
          headers: { 'content-type': 'application/json' },
        }),
      ),
    );

    await expect(api.get('v1/user/me')).rejects.toMatchObject({
      name: 'ApiError',
      status: 401,
      message: 'Session expired',
    });
    expect(unauthorized).toHaveBeenCalledTimes(1);
  });

  it('exposes details on non-2xx JSON errors', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ message: 'Invalid input', field: 'title' }), {
          status: 422,
          headers: { 'content-type': 'application/json' },
        }),
      ),
    );

    try {
      await api.get('v1/routine');
      throw new Error('Expected api.get to reject');
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect(error).toMatchObject({
        status: 422,
        details: { message: 'Invalid input', field: 'title' },
      });
    }
  });
});
