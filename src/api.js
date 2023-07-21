import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'http://192.168.110.170:3001';

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
    console.log(error, 'error');
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response.data.message === 'Token expired') {
      const refresh = await AsyncStorage.getItem('refresh_token');
      const access = await AsyncStorage.getItem('access_token');
      axios.defaults.headers = {
        ...instance.defaults.headers,
        common: {
          ...instance.defaults.headers.common,
          Authorization: `Bearer ${refresh}`,
        },
      };
      axios
        .post(
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
        )
        .then(res => {
          console.log(res);
        });
    }
  },
);
export default instance;
