import { Router } from 'express';
import { login, logout, refreshToken, signup } from '../controllers/auth.controller';

const authRouter = Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/refresh-token', refreshToken);

export default authRouter;
