import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req?.cookies?.token;

        if (!token) {
            return res.status(401).json({
                status: "fail",
                message: "You are not logged in! Please login to get access."
            });
        }

        const decoded = verifyToken(token);

        if (!decoded) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid token or token has expired."
            });
        }

        (req as any).user = decoded;

        next();
    } catch (error) {
        next(error);
    }
};