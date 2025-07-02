import { io, Socket } from 'socket.io-client';

export interface CommentType {
  id: string;
  context: string;
  templateId: string;
  userId: string;
  createdAt: string;
}

interface ServerToClientEvents {
  'comment:new': (comment: CommentType) => void;
  'comment:getAll': (comments: CommentType[]) => void;
  'comment:error': (err: { message: string }) => void;
}

interface ClientToServerEvents {
  'comment:new': (payload: { context: string; templateId: string }) => void;
  'comment:getAll': (payload: { templateId: string }) => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  import.meta.env.VITE_BASE_URL!,
  { autoConnect: true, transports: ['websocket'] },
);

export default socket;
