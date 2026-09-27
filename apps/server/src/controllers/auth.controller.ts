import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { UserModel, UserRole } from '../models/user.model';
import { OrgModel } from '../models/org.model';
import {
  signupSchema,
  loginSchema,
  logoutSchema,
  refreshTokenSchema,
} from '../validators/auth.validators';

const ACCESS_TOKEN_SECRET = requireEnv('JWT_SECRET');
const REFRESH_TOKEN_SECRET = requireEnv('JWT_REFRESH_SECRET');

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`[auth] ${name} environment variable is required`);
  return value;
}

function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

// POST /api/auth/signup
// Student self-registration only; staff/admin roles are provisioned separately (not via public signup).
export async function signup(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parsed = signupSchema.safeParse(req.body);
    if (!parsed.success) {
      res
        .status(400)
        .json({ message: parsed.error.issues[0]?.message ?? 'Invalid signup payload' });
      return;
    }

    const { firstName, lastName, email, password, orgSlug } = parsed.data;

    const org = await OrgModel.findOne({ slug: orgSlug, isActive: true });
    if (!org) {
      res.status(404).json({ message: 'Organization not found' });
      return;
    }

    const existing = await UserModel.findOne({ email });
    if (existing) {
      res.status(409).json({ message: 'An account with this email already exists' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await UserModel.create({
      firstName,
      lastName,
      email,
      passwordHash,
      role: UserRole.STUDENT,
      org_id: org._id,
      isEmailVerified: true, // no email service wired up yet; see CU-86d33kn24 backlog
    });

    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    // Concurrent signups can both pass the findOne check above; the unique index is the real guard.
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      res.status(409).json({ message: 'An account with this email already exists' });
      return;
    }
    next(error);
  }
}

// POST /api/auth/login
export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const { email, password } = parsed.data;

    const user = await UserModel.findOne({
      email: email.toLowerCase().trim(),
      isActive: true,
      isEmailVerified: true,
      deletedAt: null,
    });

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const payload = {
      sub: user._id.toString(),
      role: user.role,
      org_id: user.org_id?.toString() ?? null,
    };

    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    user.refreshTokenHash = hashToken(refreshToken);
    await user.save();

    res.status(200).json({ message: 'Login successful', accessToken, refreshToken });
  } catch (error) {
    next(error);
  }
}

// POST /api/auth/logout
export async function logout(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parsed = logoutSchema.safeParse(req.body);
    const refreshToken = parsed.success ? parsed.data.refreshToken : undefined;

    if (refreshToken) {
      const hash = hashToken(refreshToken);
      await UserModel.findOneAndUpdate({ refreshTokenHash: hash }, { refreshTokenHash: null });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

// POST /api/auth/refresh-token
export async function refreshToken(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const parsed = refreshTokenSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: 'Refresh token is required' });
      return;
    }

    const { refreshToken } = parsed.data;

    let payload: jwt.JwtPayload;
    try {
      payload = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as jwt.JwtPayload;
    } catch {
      res.status(401).json({ message: 'Invalid or expired refresh token' });
      return;
    }

    const hash = hashToken(refreshToken);
    const user = await UserModel.findOne({
      _id: payload['sub'],
      refreshTokenHash: hash,
      isActive: true,
      deletedAt: null,
    });

    if (!user) {
      res.status(401).json({ message: 'Invalid or expired refresh token' });
      return;
    }

    const newPayload = {
      sub: user._id.toString(),
      role: user.role,
      org_id: user.org_id?.toString() ?? null,
    };
    const newAccessToken = jwt.sign(newPayload, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });

    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    next(error);
  }
}
