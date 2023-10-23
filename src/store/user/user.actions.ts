import {createAsyncThunk} from '@reduxjs/toolkit';
import {IUser} from '../../utils/types';
import Toast from 'react-native-toast-message';
import UserServices from '../../api/user.services';
import {setAuth, setUnAuth} from '../auth/auth.slice';
import {clearMessages} from '../messages/message.slice';
import messaging from '@react-native-firebase/messaging';

export const createUser = createAsyncThunk(
  'USER_CREATE',
  async (user: IUser, {rejectWithValue}) => {
    try {
      const token = await messaging().getToken();
      const newUser = await UserServices.createUser(user, token);
      Toast.show({
        type: 'success',
        text1: 'success',
      });
      return newUser;
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
      });
      const errorMessage =
        error?.response?.data?.message || 'Что-то пошло не так';
      return rejectWithValue(errorMessage);
    }
  },
);

export const setUserFcmToken = createAsyncThunk(
  'SET_USER_FCM_TOKEN',
  async (_, {rejectWithValue, dispatch}) => {
    try {
      const token = await messaging().getToken();
      return await UserServices.setUserFcmToken(token);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || 'Что-то пошло не так';
      return rejectWithValue(errorMessage);
    }
  },
);

export const getUser = createAsyncThunk(
  'GET_USER',
  async (_, {rejectWithValue, dispatch}) => {
    try {
      const user = await UserServices.getUser();
      if (user) {
        dispatch(setAuth());
        return user;
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || 'Что-то пошло не так';
      dispatch(setUnAuth());
      return rejectWithValue(errorMessage);
    }
  },
);

export const getUserByMobile = createAsyncThunk(
  'GET_USER_BY_MOBILE',
  async (mobile: Array<string>, {rejectWithValue, dispatch}) => {
    try {
      return await UserServices.getUserByMobile(mobile);
    } catch (error: any) {
      dispatch(clearMessages());
      if (error?.response?.data?.message === 'User does not found!') {
        Toast.show({
          type: 'error',
          text2: 'the user does not use this messenger',
        });
      }
      const errorMessage =
        error?.response?.data?.message || 'Что-то пошло не так';
      return rejectWithValue(errorMessage);
    }
  },
);
