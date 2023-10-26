import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../App';

export interface IUser {
  _id?: string;
  mobile: string;
  nickName: string;
  password?: string;
  fcmToken?: string;
}

export interface LoginUser {
  mobile: string;
  password: string;
}

export interface IMessage {
  _id?: string;
  from: string;
  to: string;
  text: string;
  createdAt: Date;
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
