import { io, Socket } from "socket.io-client";

const socketClient: Socket = io(import.meta.env.VITE_SOCKET_URL, {
  withCredentials: true,
});

export default socketClient;