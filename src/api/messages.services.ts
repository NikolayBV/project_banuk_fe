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
}

export default new MessagesServices();
