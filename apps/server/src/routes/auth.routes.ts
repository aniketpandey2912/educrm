import { Router } from 'express';
import { login, logout, refreshToken, signup } from '../controllers/auth.controller';
import { authRateLimiterMiddleware } from '../middleware/rate-limit.middleware';

const authRouter = Router();

// Strict limiter only on brute-forceable endpoints; logout stays on the lenient global API limiter.
authRouter.post('/signup', authRateLimiterMiddleware, signup);
authRouter.post('/login', authRateLimiterMiddleware, login);
authRouter.post('/logout', logout);
authRouter.post('/refresh-token', authRateLimiterMiddleware, refreshToken);

export default authRouter;
