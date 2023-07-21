import {AxiosInstance} from 'axios';
import {IUser} from '../utils/types';
import api from '../api';

class UserServices {
  private api: AxiosInstance = api;

  constructor() {}

  createUser = async (user: IUser) => {
    const {data} = await this.api.post('api/user', user);
    return data;
  };

  getUser = async () => {
    try {
      const {data} = await this.api.get('api/user');
      return data;
    } catch (e) {
      console.log(e);
    }
  };
}

export default new UserServices();
