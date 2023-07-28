import {createAsyncThunk} from '@reduxjs/toolkit';
import MessagesServices from '../../api/messages.services';
import {IMessage} from '../../utils/types';

export const sendMessage = createAsyncThunk(
  'SEND_MESSAGE',
  async (data: IMessage, {rejectWithValue}) => {
    try {
      const result = await MessagesServices.sendMessage(data);
      return result.messages;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || 'Что-то пошло не так';
      return rejectWithValue(errorMessage);
    }
  },
);
