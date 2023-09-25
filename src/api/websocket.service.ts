import {io, Socket} from 'socket.io-client';
import {DB_URL} from '@env';

class WebsocketService {
  private socket: Socket;
  private url = DB_URL;
  constructor() {
    this.socket = io(this.url, {
      transports: ['websocket'],
    });
    // this.socket.on('connect', this.handleConnect.bind(this));
    // this.socket.on('disconnect', this.handleDisconnect.bind(this));
    // this.socket.on('error', this.handleError.bind(this));
  }

  private handleConnect() {
    console.log('WebSocket connected:', this.socket.id);
  }

  private handleDisconnect() {
    console.log('WebSocket disconnected:', this.socket.id);
  }

  private handleError(error: any) {
    console.error('WebSocket error:', error);
  }

  public connect() {
    this.socket.connect();
  }

  public sendMessage(messageType: string, data: any) {
    console.log(data, 'socket');
    this.socket.emit(messageType, data);
  }

  public disconnect() {
    this.socket.disconnect();
  }
}

export default new WebsocketService();
