import io, {Socket} from 'socket.io-client';
import {IMessage} from '../utils/types';

class WebSocketService {
  private socket: Socket | null = null;
  private url = 'http://192.168.110.211:3001';

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
