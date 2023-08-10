class WebsocketService {
  private ws: WebSocket;
  constructor() {
    this.ws = new WebSocket('ws://192.168.110.235:3001');
    this.setupWebSocket();
  }

  setupWebSocket() {
    this.ws.onopen = () => {
      console.log('WebSocket соединение установлено');
    };

    this.ws.onmessage = event => {
      this.handleMessage(event);
    };

    this.ws.onclose = () => {
      console.log('WebSocket соединение закрыто');
    };

    this.ws.onerror = error => {
      this.handleError(error);
    };
  }

  handleMessage(event: any) {
    const message = JSON.parse(event.data);
    console.log('Получено сообщение:', message);
  }

  handleError(error: any) {
    console.error('Ошибка WebSocket соединения:', error);
  }

  sendMessage(messageType: string, data: any) {
    const message = {
      type: messageType,
      data: data,
    };
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.error('WebSocket соединение не открыто');
    }
  }
}

export default new WebsocketService();
