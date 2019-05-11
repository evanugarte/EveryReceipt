import { LOGIN_SUCCESS, LOGIN_ERROR, SIGNOUT_SUCCESS, SIGNUP_SUCCESS, SIGNUP_ERROR } from "../actions/types";

const initialState = { 
  authError: null
};

/**
 * This function is concerned with handling the state of the application for
 * anything related to user authentication.
 * @param state the application's state
 * @param action the object containing the payload for data handled by 
 *      expenseActions or authActions
 */
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
  default:
    return state;
  }
}

