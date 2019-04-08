//Import constant action types
import { GET_EXPENSES, ADD_EXPENSE, DELETE_EXPENSE, EXPENSES_LOADING, SEARCH_EXPENSES } from "./types";

export const setItemsLoading = () => {
  return {
    type: EXPENSES_LOADING
  };
};

export const addExpense = (expense) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    firestore.collection("users").doc(authorId).collection("expenses")
      .add({
        expense
      });
    dispatch({ type: ADD_EXPENSE, payload: expense });
  };
};

export const getExpenses = ()  => {
  let expenses = [];
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    
    firestore.collection("users").doc(authorId).collection("expenses")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let currObj = {
            id: doc.id,
            name: doc.data().name
          };
          expenses.push(currObj);
        });
      }).then(() => {
        dispatch( { type: GET_EXPENSES, payload: expenses } );
      });
  };
};

// export const deleteItem = (id) => (dispatch) => {
//   axios.delete(`/api/items/${id}`).then(() =>
//     dispatch({
//       type: DELETE_EXPENSE,
//       payload: id
//     })
//   );
// };

// export const sendQuery = (newQuery) => (dispatch) => {
//   axios
//     .get("/api/items/search/", { params: newQuery })
//     .then(res => {
//       dispatch({
//         type: SEARCH_EXPENSES,
//         payload: res.data
//       });
//     });
// };

// export const editItem = (item) => (dispatch) => {
//   // send post request to edit an s data
//   axios.post("/api/items", item).then((res) =>
//     dispatch({
//       type: ADD_EXPENSE,
//       payload: res.data
//     })
//   );
// };
