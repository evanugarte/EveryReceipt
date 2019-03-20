/**
 * This file allows redux devtools to run our app in chrome without errors.
 */
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { getFirestore } from "redux-firestore";
import { getFirebase } from "react-redux-firebase";


const store = createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
);

export default store;
