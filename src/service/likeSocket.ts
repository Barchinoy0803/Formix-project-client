import { io, Socket } from 'socket.io-client';
import { getToken } from '../helpers';

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
  'like:updated': (data: {
    templateId: string;
    action: 'added' | 'removed';
    count: number;
    likes: LikeType[];
  }) => void;
  'like:error': (error: { message: string; code?: number }) => void;
}

interface ClientToServerEvents {
  'like:toggle': (data: { templateId: string }) => void;
  'like:getAll': (data: { templateId: string }) => void;
}

const likeSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  `${import.meta.env.VITE_BASE_URL}/likes`,
  {
    autoConnect: false,
    transports: ['websocket'],
    withCredentials: true,
  }
);

export const connectSocket = (): void => {
  const token = getToken();
  likeSocket.auth = token ? { token: `Bearer ${token}` } : {};
  likeSocket.connect();
};

export default likeSocket;