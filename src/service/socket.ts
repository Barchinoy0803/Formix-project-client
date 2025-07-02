import { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";  // <-- import type only

interface ServerToClientEvents {
  "comment:new": (comment: any) => void;
  "comment:getAll": (comments: any[]) => void;
}

interface ClientToServerEvents {
  "comment:new": (data: any) => void;
  "comment:getAll": () => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io("http://localhost:3001", {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;