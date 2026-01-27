import { NextFunction, Request, Response } from "express";
import * as userService from "../services/user.service";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { username, email, password } = req.body;

    const response = await userService.register(email, password, username);

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
    const { email, password } = req.body;

    const response = await userService.signIn(email, password, res);
    return res.json({access_token : response});
  } catch (err) {
    next(err);
  }
};

export const signOut = (req: Request, res: Response) => {};
