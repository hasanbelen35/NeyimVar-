import { Request, Response, NextFunction } from 'express';
import { Prisma } from '@prisma/client';

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error = { ...err };
  error.message = err.message;

  // PRISMA HATALARI
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // P2002: Unique Constraint (Aynı veriden var)
    if (err.code === 'P2002') {
      const field = Array.isArray(err.meta?.target) ? err.meta.target.join(', ') : err.meta?.target;
      error.message = `Bu ${field} zaten kullanımda.`;
      error.statusCode = 400;
    }
  }

 
  if (process.env.NODE_ENV === 'development') {
    console.log('💥 Error Detected :', error.message);
  }
  
  // YANIT GÖNDERME
  res.status(error.statusCode || 500).json({
    status: error.status,
    message: error.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};