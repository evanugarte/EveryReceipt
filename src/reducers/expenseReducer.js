//Import the constant types from our actions folder
import {
  GET_EXPENSES,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  SEARCH_EXPENSES,
  GET_TOTAL_PRICE
} from "../actions/types";
  
const initialState = {
  expenses: [
  ],
  expenseQuery: null,
  loading: false
};

/**
 * This function is concerned with handling the state of the application for
 * anything related to expenseActions.
 * @param state the application's state
 * @param action the object containing the payload for data handled by 
 *      expenseActions or authActions
 */
export default function (state = initialState, action) {
  switch (action.type) {
  case GET_EXPENSES:
    return {
      ...state,
      expenses: action.payload,
      loading: false
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload)
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [action.payload, ...state.expenses]
    };
  case SEARCH_EXPENSES:
    return {
      ...state,
      searchResults: action.payload
    };
  case GET_TOTAL_PRICE:
    return {
      ...state,
      totalPrice: action.payload
    };
  default:
    return {
      ...state
    };
  }
}