import {AxiosInstance} from 'axios';
import {IUser} from '../utils/types';
import api from '../api';

class UserServices {
  private api: AxiosInstance = api;

  constructor() {}

  createUser = async (user: IUser) => {
    console.log(user);
    const {data} = await this.api.post('api/user', user);
    return data;
  };

  getUser = async () => {
    const {data} = await this.api.get('api/user');
    return data;
  };

  getUserByMobile = async (mobiles: string[]) => {
    const {data} = await this.api.post('api/user/mobile', mobiles);
    return data;
  };
}

export default new UserServices();
