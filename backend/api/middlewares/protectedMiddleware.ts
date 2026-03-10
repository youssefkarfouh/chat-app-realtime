import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { NextFunction, Request, Response } from "express";


export const protectRoute = async (req: any, res: Response, next: NextFunction) => {

  let token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as jwt.JwtPayload;
    console.log("decoded after verification", decoded);
    const user = await User.findById(decoded.UserInfo.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
