// Mirrors apps/server/src/models/user.model.ts UserRole enum values.
export type UserRole = 'super_admin' | 'admin' | 'counselor' | 'support_staff' | 'student';

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  orgSlug: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}

// Decoded access-token payload (apps/server/src/types/express.d.ts JwtPayloadI).
export interface AuthUser {
  sub: string;
  role: UserRole;
  org_id: string | null;
  iat: number;
  exp: number;
}
