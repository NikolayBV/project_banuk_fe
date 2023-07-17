import {RootState} from '../index';

export const authSelectors = (state: RootState): boolean => state.auth.isAuth;
