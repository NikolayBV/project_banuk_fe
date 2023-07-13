import {IFetchingStatuses, IUser} from '../../utils/types';
import {createSlice} from '@reduxjs/toolkit';
import {login} from './auth.actions';

interface AuthSliceInitialState {
  isLoading: IFetchingStatuses | null;
  isAuth: boolean;
}

const initialState: AuthSliceInitialState = {
  isLoading: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: state => {
      state.isAuth = false;
      state.isLoading = IFetchingStatuses.success;
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, state => {
      state.isAuth = true;
      state.isLoading = IFetchingStatuses.success;
    });
    builder.addCase(login.pending, state => {
      state.isAuth = false;
      state.isLoading = IFetchingStatuses.pending;
    });
    builder.addCase(login.rejected, state => {
      state.isAuth = false;
      state.isLoading = IFetchingStatuses.error;
    });
  },
});

export const {setAuth} = authSlice.actions;
export default authSlice.reducer;
