import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import AddButton from "./AddButton.js";
import ExpenseList from "../Common/ExpenseList.js";
import CommonButton from "../Common/CommonButton.js";
import firebase from "firebase";
import { styles } from "../Common/styles";
import { getExpenses, addExpense, deleteExpense } from "../../actions/expenseActions";
import { connect } from "react-redux";
import { signOut } from "../../actions/authActions";


class HomeScreen extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      buttons: [
        {title: "Logout", onPress: this.logout.bind(this)},
        {title: "Profile", onPress: this.goToProfile.bind(this)},
        {title: "Search Expenses", onPress: this.goToSearch.bind(this)}
      ]
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.props.navigation.navigate(user ? "HomeScreen" : "LoggedOut");
    });
    this.props.getExpenses();
  }


  handleDelete(id) {
    this.props.deleteExpense(id);
  }

  logout() {
    this.props.signOut();
  }

  goToProfile() {
    this.props.navigation.navigate("Profile");
  }

  goToSearch() {
    this.props.navigation.navigate("SearchScreen");
  }

  toggleEdit(item) {
    this.props.navigation.navigate("ItemEdit", { 
      editItem: item
    });
  }

  handlePress(btnId) {
    if (btnId === "manual")
      this.props.navigation.navigate("ManualAddScreen");
  }

  render() {
    const { expenses } = this.props;
    return (
      <React.Fragment>
        <AddButton handlePress={this.handlePress.bind(this)} />
        <View style={styles.container}>
          {this.state.buttons.map((btn) => {
            return (
              <CommonButton 
                key={btn.title} 
                text={btn.title} 
                onPress={btn.onPress}
              />
            );
          })} 
          <ExpenseList 
            expenses={expenses}
            deleteExpense={this.handleDelete.bind(this)}
            toggleEdit={this.toggleEdit.bind(this)} />
        </View>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    getExpenses: () => dispatch(getExpenses()),
    deleteExpense: (id) => dispatch(deleteExpense(id))
  };
};

const mapStateToProps = (state) => {
  return {
    expenses: state.expense.expenses
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

