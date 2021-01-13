import {
  USER_AUTHENTICATION,
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
    case USER_AUTHENTICATION:
      return {
        ...state,
        loggedIn: true,
        userDetail: {
          ...state.userDetail,
          userDetail:{...action.payload},
        },
      };
    case UPDATE_USER_PLAN:
      return {
        ...state,
        loggedIn: true,
        userDetail: {
          ...state.userDetail,
          userDetail:{...state.userDetail.userDetail, plan: action.payload.plan},
        },
      };
    case REGISTER_USER:
      console.log('REGISTER_USER')
      return {
        ...state,
        loggedIn: true,
        userDetail:{
          ...state.userDetail,
          userDetail:{...action.payload},        
        },
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
