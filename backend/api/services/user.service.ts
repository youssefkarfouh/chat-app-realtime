import { IUser, User } from "../models/user.model";

export const createOrUpdateUser = async (
  name: string,
  socketId: string,
): Promise<IUser> => {
  const existingUser = await User.findOne({ name });

  if (existingUser) {
    console.log("user already exist  ");
    
    existingUser.socketId = socketId;
    return await existingUser.save();
  }

  const newUser = new User({ name, socketId });
  return await newUser.save();
};

export const deleteUserBySocketId = async (socketId: string): Promise<void> => {
  await User.deleteOne({ socketId });
};
