import {
  UPDATE_USER_DETAIL,
  USER_LOGOUT,
  UPDATE_USER_PLAN,
  REGISTER_USER
} from '../constant';

const initialUserState = {
  loggedIn: false,
  userDetail: null
};

const userReducer = (state = initialUserState, action: any) => {
  console.log('----------------')
  console.log(action.payload)
  console.log('----------------')
  switch (action.type) {
    case UPDATE_USER_DETAIL:
      console.log('UPDATE_USER_DETAIL', action.payload)
      return {
        ...state,
        loggedIn: true,
        userDetail: action.payload.userDetail
      };
    case USER_LOGOUT:
      return {
        ...state,
        loggedIn: false,
        userDetail: null
      };
    default:
      return state;
  }
};

export default userReducer;
