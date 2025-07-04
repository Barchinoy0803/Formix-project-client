// socket.ts
import { io, Socket } from 'socket.io-client';

export interface LikeType {
  id: string;
  userId: string;
  templateId: string;
  user?: {
    id: string;
    username: string;
  };
  createdAt?: Date;
}

interface ServerToClientEvents {
  'comment:new': (comment: any) => void;
  'comment:getAll': (comments: any[]) => void;
  'comment:delete': (id: string, templateId: string) => void;
  'comment:update': (comment: any) => void;
  'like:updated': (data: {
    templateId: string;
    action: 'added' | 'removed';
    count: number;
    likes: LikeType[];
  }) => void;
  'like:error': (error: { message: string; code?: number }) => void;
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
  'like:toggle': (data: { templateId: string }) => void;
  'like:getAll': (data: { templateId: string }) => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  `${import.meta.env.VITE_BASE_URL}/likes`,
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