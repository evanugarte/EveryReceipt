<<<<<<< HEAD
import { LOGIN_SUCCESS, LOGIN_ERROR, SIGNOUT_SUCCESS, SIGNUP_SUCCESS, SIGNUP_ERROR } from "../actions/types";
=======
import { LOGIN_SUCCESS, LOGIN_ERROR } from "../actions/types";
>>>>>>> Added Login for Firebase

const initialState = { 
  authError: null
};

export default function (state = initialState, action) {
  switch(action.type) {
  case LOGIN_SUCCESS:
    return {
      ...state,
      authError: null
    };
  case LOGIN_ERROR:
    return {
      ...state,
      authError: "Login failed"
    };
<<<<<<< HEAD
  case SIGNOUT_SUCCESS:
    return {
      state
    };
  case SIGNUP_SUCCESS:
    return {
      ...state,
      authError: null
    };
  case SIGNUP_ERROR:
    return {
      ...state,
      authError: action.err.message
    };
=======
>>>>>>> Added Login for Firebase
  default:
    return state;
  }
}

