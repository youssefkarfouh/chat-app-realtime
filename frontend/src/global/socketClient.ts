import { io, Socket } from "socket.io-client";

const socketClient: Socket = io(import.meta.env.VITE_API_URL, {
  withCredentials: true,
});

export default socketClient;