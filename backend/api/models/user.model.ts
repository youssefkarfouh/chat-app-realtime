import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
  username: string;
  password?: string;
  email: string;
  socketId?: string;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  socketId: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model<IUser>("User", UserSchema);
