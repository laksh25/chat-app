import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../services/token.service";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
