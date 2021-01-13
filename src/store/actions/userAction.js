import {
  USER_AUTHENTICATION,
  AUTH_ERROR_CLEAR,
  USER_LOGOUT,
  REGISTER_USER,
  AUTH_ERROR,
  UPDATE_USER_PLAN,
} from '../constant';

export const clearError = () => (dispatch) => {
  dispatch({
    type: AUTH_ERROR_CLEAR,
  });
};
export const userLogin = (credentials) => async (dispatch) => {
  
};

export const updateUser = (uid, plan) => async (dispatch) => {
  
};

export const userRegister = (newUser) => (dispatch) => {
  
};

export const userLogout = () => (dispatch) => {
  
};
