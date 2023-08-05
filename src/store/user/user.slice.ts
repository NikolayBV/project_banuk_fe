import {IUser} from '../../utils/types';
import {createSlice} from '@reduxjs/toolkit';
import {
  createUser,
  getUser,
  getUserByMobile,
  setUserFcmToken,
} from './user.actions';

interface UserState {
  currentUser: IUser | null;
  chatUser: IUser | null;
}

const initialState: UserState = {
  currentUser: null,
  chatUser: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    removeUser: state => {
      state.currentUser = null;
    },
    removeChatUser: state => {
      state.chatUser = null;
    },
  },
  extraReducers: builder => {
    builder.addCase(createUser.fulfilled, (state, {payload}) => {
      state.currentUser = payload;
    });
    builder.addCase(getUser.fulfilled, (state, {payload}) => {
      state.currentUser = payload;
    });
    builder.addCase(getUser.rejected, state => {
      state.currentUser = null;
    });
    builder.addCase(getUserByMobile.fulfilled, (state, {payload}) => {
      state.chatUser = payload;
    });
    builder.addCase(getUserByMobile.rejected, state => {
      state.chatUser = null;
    });
    builder.addCase(setUserFcmToken.fulfilled, (state, {payload}) => {
      state.currentUser = payload;
    });
    builder.addCase(setUserFcmToken.rejected, state => {
      state.currentUser = null;
    });
  },
});

export const {removeUser, removeChatUser} = userSlice.actions;

export default userSlice.reducer;
