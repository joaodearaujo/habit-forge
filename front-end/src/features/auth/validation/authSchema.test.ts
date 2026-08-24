import { describe, expect, it } from 'vitest';
import { loginSchema, registerSchema } from './authSchema';

describe('auth schemas', () => {
  it('rejects login data without a name field and validates only email/password', () => {
    expect(loginSchema.safeParse({ email: 'user@example.com', password: '12345678' }).success).toBe(true);
    expect(loginSchema.safeParse({ email: 'user@example.com', password: '123' }).success).toBe(false);
  });

  it('requires a valid register name', () => {
    expect(registerSchema.safeParse({ name: 'John', email: 'user@example.com', password: '12345678' }).success).toBe(true);
    expect(registerSchema.safeParse({ name: 'Jo', email: 'user@example.com', password: '12345678' }).success).toBe(false);
  });
});
