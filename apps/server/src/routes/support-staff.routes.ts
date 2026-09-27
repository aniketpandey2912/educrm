import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import { UserRole } from '../models/user.model';
import { roleGuard } from '../middleware/role.middleware';
import { createDashboardHandler } from '../controllers/dashboard.controller';

const supportStaffRouter = Router();

supportStaffRouter.get(
  '/dashboard',
  authMiddleware,
  roleGuard(UserRole.SUPPORT_STAFF),
  createDashboardHandler('Support Staff'),
);

export default supportStaffRouter;
