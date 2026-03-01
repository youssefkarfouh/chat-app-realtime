import { IUser, User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";
import { Response } from "express";
import { generateToken } from "../utils/generateToken";

export const register = async (
  password: string,
  username: string,
): Promise<IUser> => {
  const existingUser = await User.findOne({ username });

  if (!username || !password) {
    throw new AppError("Username and password are required", 400);
  }
  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, password: hashedPassword });

  return await newUser.save();
};

export const signIn = async (
  username: string,
  password: string,
  res:Response
): Promise<IUser> => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password as string);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  generateToken(user._id.toString(), res);

  const userResponse = {
    _id: user._id,
    username: user.username,  
    socketId: user.socketId,
    createdAt: user.createdAt,
    };

  return userResponse;
};

export const deleteUserBySocketId = async (socketId: string): Promise<void> => {
  await User.deleteOne({ socketId });
};
