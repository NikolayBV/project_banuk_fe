import {io, Socket} from 'socket.io-client';
import {DB_URL} from '@env';

class WebsocketService {
  private socket: Socket;
  private url = DB_URL;

  constructor() {
    this.socket = io(this.url, {
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('Подключение к вебсокету установлено');
    });

    this.socket.on('disconnect', () => {
      console.log('Подключение к вебсокету разорвано');
    });

    this.socket.on('newMessage', message => {
      console.log('Получено новое сообщение:', message);
    });
  }

  public sendMessage(messageType: string, data: any) {
    this.socket.emit(messageType, data);
  }

  public disconnect() {
    this.socket.disconnect();
  }
}

export default new WebsocketService();
