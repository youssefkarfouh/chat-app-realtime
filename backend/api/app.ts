import express, { Application, NextFunction, Request, Response } from 'express';
import { createServer } from 'http';
import cors from 'cors';
import { Server as SocketIOServer } from 'socket.io';
import dotenv from 'dotenv';
import connectMongo from './configs/mongo.config';
import chatRoutes from './routes/chat.routes';
import authRoutes from './routes/auth.routes';
import { handleSocketConnection } from './controllers/socket.controller';
import { errorMiddleware } from './middlewares/errorMiddleware';

dotenv.config();
connectMongo();

const app: Application = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  }),
);

app.use(chatRoutes);
app.use(authRoutes);

handleSocketConnection(io);

// Global error middleware
app.use(errorMiddleware); // ALWAYS LAST

export { httpServer };