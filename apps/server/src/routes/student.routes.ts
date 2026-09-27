import { Router } from 'express';
import { roleGuard } from '../middleware/role.middleware';
import { UserRole } from '../models/user.model';
import { authMiddleware } from '../middleware/auth.middleware';
import { createDashboardHandler } from '../controllers/dashboard.controller';

const studentRouter = Router();

studentRouter.get(
  '/dashboard',
  authMiddleware,
  roleGuard(UserRole.STUDENT),
  createDashboardHandler('Student'),
);

export default studentRouter;
