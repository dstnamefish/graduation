import { post } from '../utils/request';

import type { RegisterRequest, SendCodeRequest, LoginRequest } from '../types/apis/user';
import type { BaseResponse } from '../types/utils/request';

export const getLogin = (data: LoginRequest) => {
  return post<BaseResponse<any>>('/user/login', data);
};
export const getRegister = (data: RegisterRequest) => {
  return post<BaseResponse<any>>('/user/register', data);
};

export const getSendCode = (data: SendCodeRequest) => {
  return post<BaseResponse<any>>('/user/sendCode', data);
};
