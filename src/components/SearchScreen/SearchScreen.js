import React from "react";
import { 
  View,
  Text
} from "react-native";
import { styles } from "../Common/styles";
import SearchBar from "./SearchBar";
import ExpenseList from "../Common/ExpenseList";
import { searchExpenses, deleteExpense } from "../../actions/expenseActions";
import { connect } from "react-redux";

/**
 * This component renders any of the search results made from the SearchBar
 * component. Expenses that match a query are retrieved from expenseActions.js.
 */
class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      queryType: ""
    };
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const query = params ? params.query : null;
    const queryType = params ? params.queryType : null;
    this.props.searchExpenses(queryType, query);
  }

  /**
   * This function navigates the user to edit any of the expenses that match
   * a query. We pass parameters through this navigation so that ItemEdit.js
   * can render the appropriate data
   * @param {object} item the item to be edited
   */
  toggleEdit(item) {
    this.props.navigation.navigate("ItemEdit", { 
      editItem: item,
      searchActive: true,
      query: this.state.query,
      queryType: this.state.queryType
    });
  }

  /**
   * This function is in charge of rendering the list of any expenses
   * that match a user's query. If there is no match, the user sees
   * a phrase that explains that there is no results.
   */
  renderExpenseList() {
    let { searchResults } = this.props;
    if(typeof searchResults !== "undefined" && searchResults.length !== 0) {
      return (
        <ExpenseList 
          expenses={searchResults}
          deleteExpense={this.handleDelete.bind(this)}
          toggleEdit={this.toggleEdit.bind(this)} />
      );
    } else {
      return (
        <Text>No results</Text>
      );
    }
  }

  /**
   * Passed from ItemEdit.js, this is where we handle the item being deleted.
   * After the item is deleted, we search the expenses again, to display the
   * updated result on firebase.
   * @param {string} id the id of the item to be deleted
   */
  handleDelete(id) {
    this.props.deleteExpense(id);
    this.props.searchExpenses(this.state.queryType, this.state.query);
  }

  /**
   * This function handles the sending of a query from SearchBar.js to our
   * backend that is contained in expenseActions.js
   * @param {string} queryType the type of query (store name, price)
   * @param {string} query the value of the query
   */
  handleSearch(queryType, query) {
    this.props.searchExpenses(queryType, query);
    this.setState({
      queryType: queryType,
      query: query
    });
    this.renderExpenseList();
  }

  render() {
    return(
      <View style={styles.container}>
        <SearchBar 
          handleSearch={this.handleSearch.bind(this)} />
        {this.renderExpenseList()}
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchExpenses: (queryType, query) => dispatch(searchExpenses(queryType, query)),
    deleteExpense: (id) => dispatch(deleteExpense(id))
  };
};

const mapStateToProps = (state) => {
  return {
    searchResults: state.expense.searchResults
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

