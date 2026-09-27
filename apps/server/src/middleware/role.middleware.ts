import { Request, Response, NextFunction } from 'express';
import { UserRole } from '../models/user.model';

export function roleGuard(...allowedRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const role = req.user?.role as UserRole | undefined;

    if (!role) {
      res.status(401).json({ message: 'Missing or malformed Authorization header' });
      return;
    }

    if (role !== UserRole.SUPER_ADMIN && !allowedRoles.includes(role)) {
      res.status(403).json({ message: 'Forbidden: insufficient role' });
      return;
    }

    next();
  };
}
