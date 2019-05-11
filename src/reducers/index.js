import expenseReducer from "./expenseReducer";
import authReducer from "./authReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

/**
 * This file conbines all reducers, or action handlers to be used
 * globally by EveryReceipt
 */
const rootReducer = combineReducers({
  expense: expenseReducer,
  auth: authReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
