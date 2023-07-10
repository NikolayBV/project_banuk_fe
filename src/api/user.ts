import {IUser} from '../utils/types';
import axios from 'axios';

const url = 'api/user';

const UserApi = {
  create: (data: IUser) => axios.post(url, data),
};

export default UserApi;
