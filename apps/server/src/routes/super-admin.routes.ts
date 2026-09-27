import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { roleGuard } from '../middleware/role.middleware';
import { UserRole } from '../models/user.model';
import { createDashboardHandler } from '../controllers/dashboard.controller';

const superAdminRouter = Router();

superAdminRouter.get(
  '/dashboard',
  authMiddleware,
  roleGuard(UserRole.SUPER_ADMIN),
  createDashboardHandler('Super Admin'),
);

export default superAdminRouter;
