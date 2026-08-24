const BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080').replace(/\/$/, '');

export class ApiError extends Error {
  readonly status: number;
  readonly details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

let onUnauthorized: (() => void) | undefined;

export function setUnauthorizedHandler(handler?: () => void) {
  onUnauthorized = handler;
}

async function readBody(response: Response): Promise<unknown> {
  if (response.status === 204) return undefined;

  const text = await response.text();
  if (!text) return undefined;

  const contentType = response.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) return text;

  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

function getErrorMessage(details: unknown, status: number) {
  if (typeof details === 'object' && details !== null && 'message' in details) {
    const message = details.message;
    if (typeof message === 'string') return message;
  }

  return `Request failed with status ${status}.`;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}/${path.replace(/^\//, '')}`, {
    ...init,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      ...(init?.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
  });

  const body = await readBody(response);

  if (response.status === 401) onUnauthorized?.();

  if (!response.ok) {
    throw new ApiError(getErrorMessage(body, response.status), response.status, body);
  }

  return body as T;
}

function withBody(method: 'POST' | 'PATCH', body: unknown): RequestInit {
  return {
    method,
    body: body === undefined ? undefined : JSON.stringify(body),
  };
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T, B = unknown>(path: string, body?: B) => request<T>(path, withBody('POST', body)),
  patch: <T, B = unknown>(path: string, id: string, body: B) =>
    request<T>(`${path}/${encodeURIComponent(id)}`, withBody('PATCH', body)),
  delete: <T = void>(path: string, id: string) =>
    request<T>(`${path}/${encodeURIComponent(id)}`, { method: 'DELETE' }),
};
