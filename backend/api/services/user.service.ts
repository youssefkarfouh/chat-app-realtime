import { IUser, User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";
import { Response } from "express";
import { generateToken } from "../utils/generateToken";

export const register = async (
  email: string,
  password: string,
  username: string,
): Promise<IUser> => {
  const existingUser = await User.findOne({ email });

  // Custom error
  if (!email || !password) {
    throw new AppError("Email and password are required", 400);
  }
  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ email, password: hashedPassword, username });

  return await newUser.save();
};

export const signIn = async (
  email: string,
  password: string,
  res:Response
): Promise<string> => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

 const token = generateToken(user._id.toString(), res);
  return token;
};

export const deleteUserBySocketId = async (socketId: string): Promise<void> => {
  await User.deleteOne({ socketId });
};
