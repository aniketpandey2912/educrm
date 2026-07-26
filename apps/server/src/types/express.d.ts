import { JwtPayloadI } from '../middleware/auth.middleware';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayloadI; // Add the user property to the Request interface
    }
  }
}
