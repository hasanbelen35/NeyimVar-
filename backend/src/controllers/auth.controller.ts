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

// LOGIN CONTROLLER
export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await AuthService.loginUserService(email, password);

 res.cookie("token", result.token, {
    httpOnly: true,    
    secure: process.env.NODE_ENV === "production", 
    sameSite: "lax",   //strict
    maxAge: 30 * 1000
  });
 
  res.status(200).json({
    status: 'success',
    data: result
  });
});