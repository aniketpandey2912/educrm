import { z } from 'zod';

export const signupSchema = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  orgSlug: z.string().trim().toLowerCase().min(1),
});

export type SignupInput = z.infer<typeof signupSchema>;
