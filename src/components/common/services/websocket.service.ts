import io, {Socket} from 'socket.io-client';
import {IMessage} from '../../../utils/types';
import {DB_URL} from '@env';

class WebSocketService {
  private socket: Socket | null = null;
  private url = DB_URL;

  connect(userId: string) {
    this.socket = io(this.url, {
      query: {userId},
    });
  }

  sendMessage(userId: string, message: IMessage) {
    if (this.socket) {
      this.socket.emit('message', {userId, message});
    }
  }

  addMessageHandler(handler: (data: any) => void) {
    if (this.socket) {
      this.socket.on('message', handler);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new WebSocketService();
