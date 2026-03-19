import { NextFunction, Request, Response } from "express";
import * as userService from "../services/user.service";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, email, password } = req.body;
    const response = await userService.register(password, username, email);

    return res.status(201).json({ message: 'Signed up successfully', ...response });
  } catch (err) {
    next(err);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const response = await userService.signIn(email, password, res);
    return res.status(200).json({ message: 'Signed in successfully', access_token: response });
  } catch (err) {
    next(err);
  }
};

export const signOut = (req: Request, res: Response) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
  res.json({ message: 'Logged out successfully' });
};

export const getUserInfo = async (req: any, res: Response, next: NextFunction) => {
  try {
    const user = req.user


    return res.status(200).json({ message: 'User info fetched successfully', user });
  } catch (err) {
    next(err);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cookies = req.cookies;
    const result = await userService.handleRefreshToken(cookies);
    return res.status(200).json({ message: 'Token refreshed successfully', ...result });
  } catch (err) {
    next(err);
  }
};
