import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';

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

// POST /api/auth/login
export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;

    if (typeof email !== 'string' || typeof password !== 'string') {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

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
    const { refreshToken } = req.body;

    if (typeof refreshToken === 'string' && refreshToken.length > 0) {
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
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ message: 'Refresh token is required' });
      return;
    }

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
