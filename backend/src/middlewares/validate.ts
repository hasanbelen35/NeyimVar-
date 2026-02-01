import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validate the request body against the provided schema
    schema.parse(req.body);
    next();
  }
  // if error occurs during validation
  catch (error: any) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        status: "fail",
        errors: error.issues.map(err => ({
          field: err.path[0],
          message: err.message
        }))
      });
    }

    next(error);
  }
};