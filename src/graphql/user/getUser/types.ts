import { TUser } from '../../../store/Auth/types';

export interface IGetUserByIdData {
  getUserById: Partial<TUser>;
}

export interface IGetUserByUserNameData {
  getUserByUserName: TUser;
}
