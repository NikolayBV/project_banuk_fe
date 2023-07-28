import {RootState} from '../index';

export const currentUserSelector = (state: RootState) =>
  state.user?.currentUser;

export const chatUserSelector = (state: RootState) => state.user?.chatUser;
