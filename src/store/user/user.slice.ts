import {IUser} from '../../utils/types';
import {createSlice} from '@reduxjs/toolkit';
import {createUser, getUser} from './user.actions';

interface UserState {
  currentUser: IUser | null;
}

const initialState: UserState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, {payload}) => {
      console.log(payload);
      state.currentUser = payload;
    },
    removeUser: state => {
      state.currentUser = null;
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
  },
});

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;
