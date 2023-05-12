import {IUser} from '../../utils/types';
import {createSlice} from '@reduxjs/toolkit';

interface UserState {
  data: Array<IUser>;
}

const initialState: UserState = {
  data: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const {setUser} = usersSlice.actions;

export default usersSlice.reducer;
