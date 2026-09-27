import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleGuard } from '../middleware/role.middleware';
import { UserRole } from '../models/user.model';
import { createDashboardHandler } from '../controllers/dashboard.controller';

const adminRouter = Router();

adminRouter.get(
  '/dashboard',
  authMiddleware,
  roleGuard(UserRole.ADMIN),
  createDashboardHandler('Admin'),
);

export default adminRouter;
