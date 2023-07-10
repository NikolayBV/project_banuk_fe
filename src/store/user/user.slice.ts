import {IUser} from '../../utils/types';
import {createSlice} from '@reduxjs/toolkit';
import {createUser} from './user.actions';

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
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(createUser.fulfilled, (state, {payload}) => {
      state.currentUser = payload;
    });
  },
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer;
