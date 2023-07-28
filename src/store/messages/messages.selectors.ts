import {RootState} from '../index';

export const currentUserMessagesSelector = (state: RootState) =>
  state.messages.currentUserMessages;
