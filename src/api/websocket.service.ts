import {io} from 'socket.io-client';

class WebsocketService {
  private socket;
  constructor() {
    const socketOptions = {
      transports: ['websocket'],
    };
    this.socket = io('http://192.168.110.235:3001', socketOptions);

    this.socket.on('connect', () => {
      console.log(this.socket.id);
    });

    this.socket.on('disconnect', () => {
      console.log(this.socket.id);
    });

    this.socket.on('error', error => {
      console.error('WebSocket error:', error);
    });
  }

  sendMessage(messageType: string, data: any) {
    this.socket.emit(messageType, data);
  }
}

export default new WebsocketService();
