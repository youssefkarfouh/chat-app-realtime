import { NextFunction, Request, Response } from "express";
import * as userService from "../services/user.service";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, password } = req.body;
    const response = await userService.register(password, username);

    return res.status(201).json(response);
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
    const { username, password } = req.body;

    const response = await userService.signIn(username, password, res);
    return res.status(200).json({ message : 'Signed in successfully', ...response });
  } catch (err) {
    next(err);
  }
};

export const signOut = (req: Request, res: Response) => {};
