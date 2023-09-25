import {createAsyncThunk} from '@reduxjs/toolkit';
import MessagesServices from '../../api/messages.services';
import {IMessage} from '../../utils/types';
import WebsocketService from '../../api/websocket.service';

export const sendMessage = createAsyncThunk(
  'SEND_MESSAGE',
  async (data: IMessage, {rejectWithValue}) => {
    try {
      const result = await MessagesServices.sendMessage(data);
      WebsocketService.sendMessage('message', data);
      return result.messages;
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || 'Что-то пошло не так';
      return rejectWithValue(errorMessage);
    }
  },
);

export const getChatUserMessages = createAsyncThunk(
  'GET_CHAT_USER_MESSAGES',
  async (chatUserId: string, {rejectWithValue}) => {
    try {
      return await MessagesServices.getUserMessages(chatUserId);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || 'Что-то пошло не так';
      return rejectWithValue(errorMessage);
    }
  },
);
