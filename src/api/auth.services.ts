import axios, {AxiosInstance} from 'axios';
import {LoginUser} from '../utils/types';

class AuthServices {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: 'http://192.168.110.170:3001',
    });
  }

  login = async (user: LoginUser) => {
    const {data} = await this.api.post('auth', user);
    this.api.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
    return data;
  };
}

export default new AuthServices();
