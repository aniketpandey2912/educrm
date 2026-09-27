import { z } from 'zod';

export const signupSchema = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  orgSlug: z.string().trim().toLowerCase().min(1),
});

export type SignupInput = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const logoutSchema = z.object({
  refreshToken: z.string().min(1).optional(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1),
});
