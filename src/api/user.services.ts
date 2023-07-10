import axios, {AxiosInstance} from 'axios';
import {IUser} from '../utils/types';

class UserServices {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://183.89.55.210:3001',
    });
  }

  createUser = async (user: IUser) => {
    const {data} = await this.api.post('api/user', {user});
    return data;
  };
}

export default new UserServices();
