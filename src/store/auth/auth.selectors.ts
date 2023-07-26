import {RootState} from '../index';
import {IFetchingStatuses} from '../../utils/types';

export const authSelectors = (state: RootState): boolean => state.auth.isAuth;
export const loadingSelectors = (state: RootState): IFetchingStatuses | null =>
  state?.auth.isLoading;
