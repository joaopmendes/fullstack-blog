import { AuthActionTypes } from './auth.types';

export const login = (payload) => ({
  type: AuthActionTypes.LOGIN_USER,
  payload,
});
export const logout = () => ({
  type: AuthActionTypes.LOGIN_USER,
});
