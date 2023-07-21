import {AxiosInstance} from 'axios';
import {LoginUser} from '../utils/types';
import api from '../api';

class AuthServices {
  private api: AxiosInstance = api;

  constructor() {}

  login = async (user: LoginUser) => {
    const {data} = await this.api.post('/auth/login', user);
    return data;
  };
}

export default new AuthServices();
