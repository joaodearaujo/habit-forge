import { z } from 'zod';

export const EMAIL_MAX = 254;
export const NAME_MIN = 4;
export const NAME_MAX = 64;
export const PASSWORD_MIN = 8;
export const PASSWORD_MAX = 64;

const email = z
  .string()
  .trim()
  .min(1, 'The email cannot be empty.')
  .max(EMAIL_MAX, `The email must be at most ${EMAIL_MAX} characters long.`)
  .email('Enter a valid email address.');

const password = z
  .string()
  .min(1, 'The password cannot be empty.')
  .min(PASSWORD_MIN, `The password must be between ${PASSWORD_MIN} and ${PASSWORD_MAX} characters long.`)
  .max(PASSWORD_MAX, `The password must be between ${PASSWORD_MIN} and ${PASSWORD_MAX} characters long.`);

const name = z
  .string()
  .trim()
  .min(NAME_MIN, `The name must be between ${NAME_MIN} and ${NAME_MAX} characters long.`)
  .max(NAME_MAX, `The name must be between ${NAME_MIN} and ${NAME_MAX} characters long.`);

export const loginSchema = z.object({ email, password });
export const registerSchema = z.object({ name, email, password });

export type LoginPayload = z.infer<typeof loginSchema>;
export type RegisterPayload = z.infer<typeof registerSchema>;

export function getSchemaError(error: z.ZodError): string {
  return error.issues[0]?.message ?? 'Invalid form data.';
}
