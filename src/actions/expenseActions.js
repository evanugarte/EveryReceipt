//Import constant action types
import { 
  GET_EXPENSES, 
  ADD_EXPENSE, 
  DELETE_EXPENSE, 
  EXPENSES_LOADING, 
  EDIT_EXPENSE, 
  SEARCH_EXPENSES,
  GET_TOTAL_PRICE
} from "./types";
import { key } from "../config/api_key";

/**
 * This function sorts an array of expense objects, based on timestamp
 *      this allows us to display items rendered by date, in descending order.
 * @param {object} arr, an array of expenses
 * @return The sorted array, the most recently added expenses being first
 */
sorter = (arr) => {
  return arr.sort(
    (a,b) => 
      (parseInt(a.timestamp) > parseInt(b.timestamp)) ? -1 : 
        ((parseInt(b.timestamp) > parseInt(a.timestamp)) ? 1 
          : 0)); 
};

/**
 * This function is called when we want to tell the program that 
 *      we are loading expenses
 */
export const setItemsLoading = () => {
  return {
    type: EXPENSES_LOADING
  };
};


/**
 * This asynchronous function sends a request to cloud vision API, and 
 *      awaits a response from Google. 
 * @param {string} uri a base64 encoded value
 * @return The parsed object, which contains both total price and store.
 */
export const handleCloudOCR = async (uri) => {

  const parsedObj = {
    total: "",
    store: ""
  };

  try {
    let body = JSON.stringify({
      requests: [
        {
          features: [
            { type: "DOCUMENT_TEXT_DETECTION", maxResults: 10 },
          ],
          image: {
            content: uri
          }
        }
      ]
    });
    let response = await fetch(
      "https://vision.googleapis.com/v1/images:annotate?key=" +
        key,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: body
      }
    );

    let store = null;

    let test = JSON.stringify(response);
    test = 
      test.substring(
        test.lastIndexOf("\"text\\"), test.lastIndexOf("}"));
    test = test.split("\\n");

    let result = -1;
    for(var i in test) {
      if(test[i].toLowerCase().indexOf("total") !== -1 &&
      test[i].toLowerCase().indexOf("subtotal") === -1) {
        let total = test[i].match(/\d+(?:\.\d+)?/g);
        if(total !== null) {
          result = total[0];
        }
        break;
      }
      if (test[i].toLowerCase().includes("walmart")) {
        store = "Walmart";
      } else if (test[i].toLowerCase().includes("target")) {
        store = "Target";
      } else if (test[i].toLowerCase().includes("walgreens")) {
        store = "Walgreens";
      }
    }

    parsedObj.total = result === -1 ? "" : result;
    parsedObj.store = store === null ? "" : store;
  } catch(err) { }

  return parsedObj;  
};

/**
 * This function adds an expense to our list of expenses on Firebase 
 * @param {object} expense an object containing store name, items and total
 * @return The added expense as a payload to expenseReducer to be rendered in
 *      the view.
 */
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

/**
 * This function gets all the expenses from a list of expenses on Firebase 
 * @return The array of expense object from firebase to be loaded in the view
 */
export const getExpenses = () => {
  let expenses = [];
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    
    firestore.collection("users").doc(authorId).collection("expenses")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let curr = doc.data().expense;
          let currObj = {
            id: doc.id,
            store: curr.store,
            items: curr.items,
            timestamp: curr.timestamp,
            total: curr.total
          };
          expenses.push(currObj);
        });
      }).then(() => {
        expenses = sorter(expenses);
        dispatch( { type: GET_EXPENSES, payload: expenses } );
      });
  };
};


/**
 * This function adds deletes expense to our list of expenses on Firebase 
 * @param {string} id the id of our expense to delete
 * @return The id of the expense that was deleted
 */
export const deleteExpense = (id) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    
    var result = firestore.collection("users")
      .doc(authorId).collection("expenses").doc(id);

    result.delete()
      .then(() => {
        dispatch( { type: DELETE_EXPENSE, payload: id } );
      });
  };
};

/**
 * This function updates the data of an expense, based on ID on Firebase 
 * @param {string} id the id of our expense to update
 * @param {object} expense any data to be updated to on Firebase
 * @return The id of the expense that was updated
 */
export const editExpense = (id, expense) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    
    var result = firestore.collection("users")
      .doc(authorId).collection("expenses").doc(id);

    result.update({expense})
      .then(() => {
        dispatch( { type: EDIT_EXPENSE, payload: id } );
      });
  };
};

/**
 * This function searches our list of expenses on firebase, based on a type and
 *      query value 
 * @param {string} queryType the id of our expense to update
 * @param {string} query any data to be updated to on Firebase
 * @return The list of expenses that match the query
 */
export const searchExpenses = (queryType, query) => {
  let searchResults = [];
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;

    firestore.collection("users").doc(authorId).collection("expenses")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let curr = doc.data().expense;
          let currObj = {
            id: doc.id,
            store: curr.store,
            items: curr.items,
            total: curr.total
          };

          if(queryType === "store") {
            if(currObj.store.toLowerCase().includes(query.toLowerCase())) {
              searchResults.push(currObj);
            }
          } else if (queryType === "price-greater-than") {
            if(parseFloat(currObj.total) >= parseFloat(query)) {
              searchResults.push(currObj);
            }
          } else if (queryType === "price-less-than") {
            if(parseFloat(currObj.total) <= parseFloat(query)) {
              searchResults.push(currObj);
            }
          }
        });
      }).then(() => {
        dispatch( { type: SEARCH_EXPENSES, payload: searchResults } );
      });
  };
};

/**
 * This function sums up all the receipt totals in firebase
 * @return {float} total receipt sum
 */
export const getTotalPrice = () => {
  let total = 0;
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;
    
    firestore.collection("users").doc(authorId).collection("expenses")
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          let curr = doc.data().expense;
          total += parseFloat(curr.total);
        });
      }).then(() => {
        dispatch( { type: GET_TOTAL_PRICE, payload: total.toFixed(2) } );
      });
  };
};
