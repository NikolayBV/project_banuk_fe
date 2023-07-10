import {IUser} from '../../utils/types';
import {createSlice} from '@reduxjs/toolkit';

interface AuthSliceInitialState {
  isLoading: boolean;
  isAuth: boolean;
}

const initialState: AuthSliceInitialState = {
  isLoading: false,
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default authSlice.reducer;
