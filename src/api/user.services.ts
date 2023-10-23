import {AxiosInstance} from 'axios';
import {IUser} from '../utils/types';
import api from '../api';

class UserServices {
  private api: AxiosInstance = api;

  constructor() {}

  createUser = async (user: IUser, token: string) => {
    const {data} = await this.api.post('api/user', {user, fcmToken: token});
    return data;
  };

  getUser = async () => {
    const {data} = await this.api.get('api/user');
    return data;
  };

  getRegisterUsersNumbers = async (): Promise<string[]> => {
    const {data} = await this.api.get('api/user/numbers');
    return data;
  };

  setUserFcmToken = async (token: string) => {
    const {data} = await this.api.post('api/user/fcm', {token});
    return data;
  };

  getUserByMobile = async (mobiles: string[]) => {
    const {data} = await this.api.post('api/user/mobile', mobiles);
    return data;
  };
}

export default new UserServices();
