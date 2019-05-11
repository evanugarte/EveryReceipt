import { LOGIN_SUCCESS, LOGIN_ERROR, SIGNOUT_SUCCESS, SIGNUP_SUCCESS, SIGNUP_ERROR } from "./types";

/**
 * This function logs a user in, and will be successful if an account
 *    matches both the email and password.
 * @param {object} credentials, the user's credentials that contain an 
 *      email and password
 * @return The program state to our reducer, authReducer.js, signifying
 *      if the log in was successful or not.
 */
export const signIn = (credentials) => {
  return(dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: LOGIN_SUCCESS });
    }).catch((err) => {
      dispatch({ type: LOGIN_ERROR, err });
    });
  };
};

/**
 * This function signs out our user from EveryReceipt.
 * @return The program state to our reducer, authReducer.js, signifying
 *      if the sign out was successful.
 */
export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({type: SIGNOUT_SUCCESS });
    });
  };
};

/**
 * This function signs a user in, and will be successful if an account
 *    matches both the email and password.
 * @param {object} newUser, the new user's credentials that contain an 
 *      email password, first and last name
 * @return The program state to our reducer, authReducer.js, signifying
 *      if the sign up was successful or not.
 */
export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((res) => {
      /* add a user to user collection with id, sets data inside */
      return firestore.collection("users").doc(res.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: newUser.firstName[0] + newUser.lastName[0],
      });
    }).then(() => {
      dispatch({ type: SIGNUP_SUCCESS });
    }).catch((err) => {
      dispatch({type: SIGNUP_ERROR, err });
    });
  };
};

