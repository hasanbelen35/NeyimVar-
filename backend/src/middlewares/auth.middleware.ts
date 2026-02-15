import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies?.token;
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in!"
      });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        status: "fail",
        message: "Invalid token or expired."
      });
    }

    req.user = {
      userId: decoded.userId 
    };

    next();
  } catch (error) {
    next(error);
  }
};