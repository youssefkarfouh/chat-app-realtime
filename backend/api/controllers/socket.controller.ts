import { Server, Socket } from 'socket.io';
import * as userService from '../services/user.service';
import * as messageService from '../services/message.service';

export const handleSocketConnection = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    // when user want to join a room
    socket.on('join', async ({ roomId }) => {

      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    // when user sends a message
    socket.on('sendMessage', async ({ roomId, senderId, username, text }) => {
      const message = await messageService.createMessage(
        roomId,
        senderId,
        username,
        text,
      );

      io.to(roomId).emit('sendMessage', message);
      console.log("new message received backend", message);
    });

    // when user disconnects
    socket.on('disconnect', async () => {

    });
  });
};