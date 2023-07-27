import {createAsyncThunk} from '@reduxjs/toolkit';
import {LoginUser} from '../../utils/types';
import AuthServices from '../../api/auth.services';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setUser} from '../user/user.slice';
import {setAuth} from './auth.slice';

export const login = createAsyncThunk(
  'LOGIN',
  async (loginData: LoginUser, {rejectWithValue, dispatch}) => {
    try {
      const data = await AuthServices.login(loginData);
      if (data) {
        const {access_token, refresh_token, user} = data;
        await AsyncStorage.setItem('access_token', access_token);
        await AsyncStorage.setItem('refresh_token', refresh_token);
        dispatch(setUser(user));
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text2: 'error',
      });
      const errorMessage =
        error?.response?.data?.message || 'Что-то пошло не так';
      return rejectWithValue(errorMessage);
    }
  },
);

export const verifyToken = createAsyncThunk(
  'VERIFY_TOKEN',
  async (token: string, {rejectWithValue, dispatch}) => {
    try {
      const data = await AuthServices.verify(token);
      return data;
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text2: 'error',
      });
      const errorMessage =
        error?.response?.data?.message || 'Что-то пошло не так';
      return rejectWithValue(errorMessage);
    }
  },
);
