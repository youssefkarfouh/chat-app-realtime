import { Server, Socket } from 'socket.io';
import * as userService from '../services/user.service';
import * as messageService from '../services/message.service';

export const handleSocketConnection = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    // when user want to join a room
    socket.on('join', async ({ name, roomId }) => {
      await userService.createOrUpdateUser(name, socket.id);
      socket.join(roomId);
      console.log(`${name} joined room: ${roomId}`);
    });

    // when user sends a message
    socket.on('message', async ({ roomId, senderId, username, text }) => {
      const message = await messageService.createMessage(
        roomId,
        senderId,
        username,
        text,
      );
      io.to(roomId).emit('message', message);
    });

    // when user disconnects
    socket.on('disconnect', async () => {
      await userService.deleteUserBySocketId(socket.id);
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};