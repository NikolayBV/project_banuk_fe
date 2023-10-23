import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DB_URL} from '@env';

const baseURL = 'http://192.168.110.211:3001';
console.log(baseURL, 'url');
const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('access_token');
    const state = {...config};
    if (token) {
      state.headers.Authorization = `Bearer ${token}`;
    }
    return state;
  },
  error => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.data.message === 'Token expired') {
      try {
        const refresh = await AsyncStorage.getItem('refresh_token');
        const access = await AsyncStorage.getItem('access_token');
        const res = await axios.post(
          baseURL + '/auth/token/refresh',
          {
            access_token: access,
            refresh_token: refresh,
          },
          {
            headers: {
              Authorization: `Bearer ${refresh}`,
            },
          },
        );
        const access_token = res.data.access_token;
        const refresh_token = res.data.refresh_token;
        await Promise.all([
          AsyncStorage.setItem('access_token', access_token),
          AsyncStorage.setItem('refresh_token', refresh_token),
        ]);
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return axios(originalRequest);
      } catch (err) {
        throw new Error('Unauthorized');
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
