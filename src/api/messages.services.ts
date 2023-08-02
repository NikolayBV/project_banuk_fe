import {AxiosInstance} from 'axios';
import api from '../api';
import {IMessage} from '../utils/types';

class MessagesServices {
  private api: AxiosInstance = api;

  constructor() {}

  sendMessage = async (message: IMessage) => {
    const {data} = await this.api.post('api/messages', message);
    return data;
  };

  getUserMessages = async (chatUserId: string) => {
    const {data} = await this.api.get(`api/messages/${chatUserId}`);
    return data;
  };
}

export default new MessagesServices();
