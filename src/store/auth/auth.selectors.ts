import {RootState} from '../index';

export const authSelectors = (state: RootState) => state.auth.isAuth;
