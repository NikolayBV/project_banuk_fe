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
    } catch (e) {
      console.log(e);
      rejectWithValue(e);
    }
  },
);
