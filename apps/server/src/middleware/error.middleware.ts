import { Request, Response, NextFunction } from 'express';

export interface AppErrorI extends Error {
  status?: number;
  statusCode?: number;
}

export const errorMiddleware = (
  err: AppErrorI,
  req: Request,
  res: Response,
  next: NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  const status = err.status ?? err.statusCode ?? 500;
  const message =
    process.env.NODE_ENV === 'production' && status === 500 ? 'Internal Server Error' : err.message;

  console.error(`[${req.method}] ${req.path} → ${status}: ${err.message}`);

  res.status(status).json({ message });
};
