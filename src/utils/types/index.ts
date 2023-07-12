export interface IUser {
  mobile: string;
  nickName: string;
  password: string;
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
