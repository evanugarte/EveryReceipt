import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import { getExpenses, addExpense, deleteExpense } from "../../actions/expenseActions";
import ExpenseItem from "./ExpenseItem";

class ExpenseList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getExpenses();
  }

  handleDelete(id) {
    this.props.deleteExpense(id);
  }

  render() {
    const { expenses } = this.props;
    return(
      <View>
        {expenses.map((exp) => {
          return(
            <ExpenseItem 
              key={exp.id} 
              handleDelete={this.handleDelete.bind(this)}
              toggleEdit={this.props.toggleEdit.bind(this)}
              item={exp} />
          );
        })}
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getExpenses: () => dispatch(getExpenses()),
    addExpense: (item) => dispatch(addExpense(item)),
    deleteExpense: (id) => dispatch(deleteExpense(id))
  };
};

const mapStateToProps = (state) => {
  return {
    expenses: state.expense.expenses
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);

