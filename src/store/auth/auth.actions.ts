import {createAsyncThunk} from '@reduxjs/toolkit';
import {LoginUser} from '../../utils/types';
import AuthServices from '../../api/auth.services';
import Toast from 'react-native-toast-message';
import {setUser} from '../user/user.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = createAsyncThunk(
  'LOGIN',
  async (loginData: LoginUser, {rejectWithValue, dispatch}) => {
    try {
      const data = await AuthServices.login(loginData);
      const {access_token, refresh_token, user} = data;
      await AsyncStorage.setItem('access_token', access_token);
      dispatch(setUser(user));
      console.log(access_token, refresh_token);
    } catch (e) {
      Toast.show({
        type: 'error',
        text2: 'error',
      });
      console.log(e);
      rejectWithValue(e);
    }
  },
);
