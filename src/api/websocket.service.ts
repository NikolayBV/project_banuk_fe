import {io, Socket} from 'socket.io-client';
import {DB_URL} from '@env';

class WebsocketService {
  private socket: Socket;
  private url = 'http://192.168.110.148:3001';

  constructor(userId: string | undefined) {
    this.socket = io(this.url, {
      transports: ['websocket'],
      query: {userId},
    });

    this.socket.on('connect', () => {
      console.log(userId);
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
    console.log(this.socket.id);
    this.socket.emit('joinRoom', {roomName: `user_${data.to}`});
    this.socket.emit(messageType, data);
  }

  public disconnect() {
    this.socket.disconnect();
  }
}

export default WebsocketService;
