import { Router } from 'express';
import { login, logout, refreshToken, signup } from '../controllers/auth.controller';
import { authRateLimiterMiddleware } from '../middleware/rate-limit.middleware';

const authRouter = Router();

authRouter.use(authRateLimiterMiddleware);

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/refresh-token', refreshToken);

export default authRouter;
