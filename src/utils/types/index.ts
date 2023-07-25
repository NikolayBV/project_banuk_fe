import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';

export interface IUser {
  mobile: string;
  nickName: string;
}

export interface LoginUser {
  mobile: string;
  password: string;
}

export enum IFetchingStatuses {
  pending = 'pending',
  success = 'success',
  error = 'error',
}

export type RootNavigationProp = StackNavigationProp<
  RootStackParamList,
  'EnterScreen'
>;
