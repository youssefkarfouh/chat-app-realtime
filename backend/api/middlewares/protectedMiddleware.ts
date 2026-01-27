import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { NextFunction, Request, Response } from "express";

export const protectRoute = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    // Handle JWT-specific errors HERE
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Unauthorized - Token Expired" });
    }
    // Pass unexpected errors to global handler
    next(error);
  }
};
