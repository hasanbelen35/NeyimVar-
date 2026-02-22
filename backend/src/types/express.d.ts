import * as express from 'express';
import { Request } from 'express';
export declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
      };
    }
  }
}
interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}