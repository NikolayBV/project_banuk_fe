import {createAsyncThunk} from '@reduxjs/toolkit';
import {IUser} from '../../utils/types';
import Toast from 'react-native-toast-message';
import UserServices from '../../api/user.services';

export const createUser = createAsyncThunk(
  'USER_CREATE',
  async (user: IUser, {rejectWithValue, dispatch}) => {
    try {
      const newUser = await UserServices.createUser(user);
      Toast.show({
        type: 'success',
        text1: 'success',
      });
      return newUser;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || 'Что-то пошло не так';
      return rejectWithValue(errorMessage);
    }
  },
);

export const getUser = createAsyncThunk(
  'GET_USER',
  async (_, {rejectWithValue}) => {
    try {
      return await UserServices.getUser();
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || 'Что-то пошло не так';
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
      const errorMessage =
        error?.response?.data?.message || 'Что-то пошло не так';
      return rejectWithValue(errorMessage);
    }
  },
);
