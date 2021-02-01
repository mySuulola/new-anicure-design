import {
  UPDATE_USER_DETAIL,
  USER_LOGOUT,
} from '../constant';
import { Dispatch } from 'redux';

export const updateUserDetail = (
  credentials: {email: string, username: string}
  ) => async (
    dispatch: Dispatch
    ) => {
  return dispatch({
    type: UPDATE_USER_DETAIL,
    payload: credentials,
  });
};

export const userLogout = () => (
  dispatch: Dispatch
  ) => {
  return dispatch({
    type: USER_LOGOUT,
    payload: null,
  });
};
