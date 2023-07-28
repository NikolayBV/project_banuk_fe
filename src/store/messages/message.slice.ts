import {createSlice} from '@reduxjs/toolkit';
import {IMessage} from '../../utils/types';
import {sendMessage} from './message.actions';

interface MessageState {
  currentUserMessages: IMessage[];
}

const initialState: MessageState = {
  currentUserMessages: [],
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(sendMessage.fulfilled, (state, {payload}) => {
      state.currentUserMessages = payload;
    });
  },
});

export default messageSlice.reducer;
