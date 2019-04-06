import React from "react";
import { Text, Button } from "react-native";
import { connect } from "react-redux";
import { getExpenses, addExpense } from "../../actions/expenseActions";

/**
 * TODO: 
 * - Send in profile so we know the collection and then get the expenses collection
 * - refer to collection in collection from firebase docs
 * - Do get (by date added?), add, delete, search (filter)
 */

class ExpenseList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getExpenses();
  }

  render() {
    const { expenses } = this.props;
    return(
      <React.Fragment>
        {expenses.map((exp) => {
          return(
            <Text key={exp.id} style={{color: "black", fontSize: 30}}>
              {exp.name}
            </Text>
          );
        })}
        <Button title="yeah"
          onPress={() => {  
            this.props.addExpense( {name: "onetwo" + Math.random()});
          }} />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getExpenses: () => dispatch(getExpenses()),
    addExpense: (item) => dispatch(addExpense(item))
  };
};

const mapStateToProps = (state) => {
  return {
    expenses: state.expense.expenses
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseList);

