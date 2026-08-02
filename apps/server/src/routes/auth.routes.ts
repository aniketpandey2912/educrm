import { Router } from 'express';
import { login, logout, refreshToken } from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/refresh-token', refreshToken);

export default authRouter;
