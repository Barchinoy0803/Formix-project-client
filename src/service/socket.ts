import { io, Socket } from 'socket.io-client';

export interface CommentType {
  id: string;
  context: string;
}

interface ServerToClientEvents {
  'comment:new': (comment: CommentType) => void;
  'comment:getAll': (comments: CommentType[]) => void;
}

interface ClientToServerEvents {
  'comment:new': (payload: { context: string; templateId: string }) => void;
  'comment:getAll': (templateId: string) => void;          
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  `${import.meta.env.VITE_BASE_URL}/comments`,
  {
    autoConnect: false,                                     
    transports: ['websocket'],                            
  },
);

export const connectSocket = (): void => {
  const token = localStorage.getItem('token');
  socket.auth = token ? { token: `Bearer ${token}` } : {};
  socket.connect();
};

export default socket;
