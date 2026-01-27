import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import mongoose from "mongoose";

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {

    // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      status: "fail",
      message: messages.join(", "),
    });
  }
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Unknown error
  console.error("UNEXPECTED ERROR 💥", err);

  res.status(500).json({
    status: "error",
    message: "Something went wrong",
  });
};
