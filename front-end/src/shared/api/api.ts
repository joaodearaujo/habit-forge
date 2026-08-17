const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const getHeaders = (): HeadersInit => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  return headers;
};

export const api = {
  get: async <T>(path: string): Promise<T> => {
    try {
      const res = await fetch(`${BASE_URL}/${path}`, {
        headers: getHeaders(),
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.status}`);
      }
      return res.json();
    } catch (err) {
      console.error('Fetch failed:', err);
      throw err;
    }
  },
  post: async <T, B>(path: string, body: B): Promise<T> => {
    try {
      const res = await fetch(`${BASE_URL}/${path}`, {
        method: 'POST',
        headers: getHeaders(),
        credentials: 'include',
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        throw new Error(`Failed to send: ${res.status}`);
      }
      return res.json();
    } catch (err) {
      console.error('Failed to create:', err);
      throw err;
    }
  },
  patch: async <B>(path: string, id: string, body: B): Promise<void> => {
    try {
      const res = await fetch(`${BASE_URL}/${path}/${id}`, {
        method: 'PATCH',
        headers: getHeaders(),
        credentials: 'include',
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        throw new Error(`Failed to update: ${res.status}`);
      }
    } catch (err) {
      console.error('Failed to update:', err);
      throw err;
    }
  },
  delete: async (path: string, id: string): Promise<void> => {
    try {
      const res = await fetch(`${BASE_URL}/${path}/${id}`, {
        method: 'DELETE',
        headers: getHeaders(),
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error(`Failed to delete: ${res.status}`);
      }
    } catch (err) {
      console.error('Failed to delete:', err);
      throw err;
    }
  },
};
