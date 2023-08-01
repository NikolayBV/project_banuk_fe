import {RootState} from '../index';

export const currentUserMessagesSelector = (state: RootState) =>
  state.messages.currentUserMessages;

export const isMessagesLoading = (state: RootState) =>
  state.messages.isLoadingMessages;
