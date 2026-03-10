import { IUser, User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../exceptions/AppError";
import { Request, Response } from "express";


export const register = async (
  password: string,
  username: string,
  email: string,
): Promise<IUser> => {
  const existingUser = await User.findOne({ email });

  if (!username || !password) {
    throw new AppError("Username and password are required", 400);
  }
  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ username, password: hashedPassword, email });

  const savedUser = await newUser.save()

  const userResponse = {
    _id: savedUser._id,
    username: savedUser.username,
    email: savedUser.email,
    createdAt: savedUser.createdAt,
    roles: savedUser.roles,
  };

  return userResponse as IUser;
};
export const signIn = async (email: string, password: string, res: Response): Promise<string> => {
  if (!email || !password) {
    throw new AppError("Username and password are required", 400);
  }

  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser) {
    throw new AppError("Invalid username or password", 401);
  }

  // evaluate password 
  if (!foundUser.password) {
    throw new AppError("Invalid username or password", 401);
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) {
    throw new AppError("Invalid username or password", 401);
  }

  const roles = foundUser.roles;

  // create JWTs
  const accessToken = jwt.sign(
    {
      "UserInfo": {
        "username": foundUser.username,
        "roles": roles,
        "userId": foundUser._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET!,
    { expiresIn: '1h' }
  );
  const refreshToken = jwt.sign(
    { "username": foundUser.username },
    process.env.REFRESH_TOKEN_SECRET!,
    { expiresIn: '1d' }
  );

  // Saving refreshToken with current user in db
  foundUser.refreshToken = refreshToken;
  await foundUser.save();

  res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });

  return accessToken;
}
export const handleRefreshToken = async (cookies: any) => {

  if (!cookies?.jwt) throw new AppError('Refresh token missing', 401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) throw new AppError('Forbidden', 403);

  // evaluate jwt 
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!
    ) as any;

    if (foundUser.username !== decoded?.username) {
      throw new AppError('Forbidden', 403);
    }

    const roles = foundUser.roles ? Object.values(foundUser.roles) : [];
    const user = decoded.username;
    const accessToken = jwt.sign(
      {
        "UserInfo": {
          "username": decoded.username,
          "roles": roles
        }
      },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: '1h' }
    );
    return { user, roles, accessToken };
  } catch (err) {
    throw new AppError('Forbidden', 403);
  }
}
export const deleteUserBySocketId = async (socketId: string): Promise<void> => {
  await User.deleteOne({ socketId });
};
