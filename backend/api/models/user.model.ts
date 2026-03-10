import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
  username: string;
  password?: string;
  email: string;
  socketId?: string;
  createdAt: Date;
  refreshToken?: string;
  roles?: string[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  socketId: { type: String, required: false },
  refreshToken: { type: String, required: false },
  roles: {
    type: [String], // Array of strings
    default: ['User'],
    enum: ['User', 'Admin'] // Default role is 'User'
  },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>("User", UserSchema);
