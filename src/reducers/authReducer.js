import { LOGIN_SUCCESS, LOGIN_ERROR, SIGNOUT_SUCCESS } from "../actions/types";

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
  case SIGNOUT_SUCCESS:
    return {
      state
    };
  default:
    return state;
  }
}

