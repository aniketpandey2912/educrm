import { Request, Response } from 'express';

export function createDashboardHandler(roleLabel: string) {
  return (req: Request, res: Response): void => {
    res.status(200).json({ message: `${roleLabel} dashboard`, user: req.user });
  };
}
