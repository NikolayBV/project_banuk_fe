import {RootState} from '../index';

export const currentUserSelector = (state: RootState) =>
  state.user?.currentUser;
