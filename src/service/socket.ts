import { io, Socket } from 'socket.io-client';

interface ServerToClientEvents {
  'comment:new': (comment: any) => void;
  'comment:getAll': (comments: any[]) => void;
  'comment:delete': (id: string, templateId: string) => void;
  'comment:update': (comment: any) => void;
}

interface ClientToServerEvents {
  'comment:new': (payload: { context: string; templateId: string }) => void;
  'comment:getAll': (templateId: string) => void;
  'comment:delete': (payload: { id: string; templateId: string }) => void;
  'comment:update': (payload: {
    id: string;
    updateData: {
      context: string;
      templateId: string;
    };
    templateId: string;
  }) => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  `${import.meta.env.VITE_BASE_URL}/comments`,
  {
    autoConnect: false,
    transports: ['websocket'],
    withCredentials: true,
  }
);

export const connectSocket = (): void => {
  const token = localStorage.getItem('token');
  socket.auth = token ? { token: `Bearer ${token}` } : {};
  socket.connect();
};

export default socket;