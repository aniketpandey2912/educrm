import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface JwtPayloadI {
  sub: string; // user ID
  role: string; // 'admin' | 'student' | 'staff' | 'super-admin'
  iat: number; // issued at timestamp
  exp: number; // expiration timestamp
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader: string | undefined = req.headers['authorization'];

  const [scheme, token] = authHeader?.split(' ') ?? [];

  if (scheme !== 'Bearer' || !token) {
    res.status(401).json({ message: 'Missing or malformed Authorization header' });
    return;
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('[auth] JWT_SECRET environment variable is required');
  }

  try {
    const decoded = jwt.verify(token, secret) as unknown as JwtPayloadI;
    req.user = decoded; // Attach the decoded token payload to the request object
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
    return;
  }
};
