import React from "react";
import { 
  View
} from "react-native";
import { styles } from "../Common/styles";
import SearchBar from "./SearchBar";
import CommonButton from "../Common/CommonButton";
import ExpenseList from "../Common/ExpenseList";
import { searchExpenses } from "../../actions/expenseActions";
import { connect } from "react-redux";

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onQueryChange() {

  }

  toggleEdit(item) {
    this.props.navigation.navigate("ItemEdit", { 
      editItem: item
    });
  }

  handleDelete(id) {
    this.props.deleteExpense(id);
  }

  handleSearch(queryType, query) {
    this.props.searchExpenses(queryType, query);
  }

  goHome() {
    this.props.navigation.navigate("HomeScreen");
  }

  render() {
    let { searchResults } = this.props;
    return(
      <View style={styles.container}>
        <CommonButton 
          onPress={this.goHome.bind(this)}
          text="Go Home"
        />
        <SearchBar 
          onQueryChange={this.onQueryChange.bind(this)}
          handleSearch={this.handleSearch.bind(this)} />

        <ExpenseList 
          expenses={searchResults}
          deleteExpense={this.handleDelete.bind(this)}
          toggleEdit={this.toggleEdit.bind(this)} />
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

