import {
    AUTH_ERROR,
    AUTH_ERROR_CLEAR,
  } from '../constant';
  
  const errorLog = {
    authError: ""
  };
  
  const checkError = (code) => {
    console.log(code)
    let authError = "";
    switch (code) {
      case 'auth/invalid-email':
        authError = 'Invalid Email';
        break;
      case 'auth/user-not-found':
        authError = 'User Not Found';
        break;
      case 'auth/wrong-password':
        authError = 'Wrong Password';
        break;
      default:
        authError = 'Try again later';
        break;
    }
    console.log('++++++++++', authError)
    return authError;
  }


  const errorReducer = (state = errorLog, action) => {
    switch (action.type) {
      case AUTH_ERROR:
        return {
          ...state,
         authError: checkError(action.payload.code)
        };
      case AUTH_ERROR_CLEAR:
        return {
          ...state,
         authError: ""
        };
      default:
        return state;
    }
  };
  
  export default errorReducer;
  