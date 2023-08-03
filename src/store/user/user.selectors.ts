import {RootState} from '../index';
import {createSelector} from '@reduxjs/toolkit';

export const currentUserSelector = (state: RootState) =>
  state.user?.currentUser;

export const chatUserSelector = (state: RootState) => state.user?.chatUser;

export const chatUserIdSelector = createSelector(chatUserSelector, user => {
  return user?._id;
});

export const currentUserIdSelector = createSelector(
  currentUserSelector,
  user => {
    return user?._id;
  },
);
