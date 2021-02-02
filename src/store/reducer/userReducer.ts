import {
  UPDATE_USER_DETAIL,
  USER_LOGOUT,
  UPDATE_USER_PLAN,
  REGISTER_USER
} from '../constant';

const initialUserState = {
  loggedIn: false,
  userDetail: {}
};

const userReducer = (state = initialUserState, action) => {
  console.log('----------------')
  console.log(action)
  console.log('----------------')
  switch (action.type) {
    case UPDATE_USER_DETAIL:
      return {
        ...state,
        loggedIn: true,
        userDetail: action.payload
      };
    case USER_LOGOUT:
      return {
        ...state,
        loggedIn: false,
      };
    default:
      return state;
  }
};

export default userReducer;
