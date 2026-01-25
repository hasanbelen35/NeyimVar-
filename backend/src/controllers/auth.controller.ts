import { Request, Response } from 'express';
import * as AuthService from '../services/auth.service';
import { catchAsync } from '../utils/catchAsync';
// REGISTER CONTROLLER
export const register = catchAsync(async (req: Request, res: Response) => {
  const user = await AuthService.registerUserService(req.body);
  
  res.status(201).json({
    status: 'success',
    data: user
  });
});