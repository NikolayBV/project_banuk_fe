import {createSlice} from '@reduxjs/toolkit';
import {IMessage} from '../../utils/types';
import {getChatUserMessages, sendMessage} from './message.actions';

interface MessageState {
  currentUserMessages: IMessage[];
  isLoadingMessages: boolean;
}

const initialState: MessageState = {
  currentUserMessages: [],
  isLoadingMessages: false,
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(sendMessage.fulfilled, (state, {payload}) => {
      state.currentUserMessages = payload;
    });
    builder.addCase(getChatUserMessages.fulfilled, (state, {payload}) => {
      state.currentUserMessages = payload;
      state.isLoadingMessages = false;
    });
    builder.addCase(getChatUserMessages.pending, state => {
      state.isLoadingMessages = true;
    });
  },
});

export default messageSlice.reducer;
