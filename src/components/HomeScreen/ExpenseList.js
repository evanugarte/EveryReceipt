import React from "react";
import { Text } from "react-native";
import { connect } from "react-redux";

/**
 * TODO: 
 * - Send in profile so we know the collection and then get the expenses collection
 * - refer to collection in collection from firebase docs
 * - Do get (by date added?), add, delete, search (filter)
 */

class ExpenseList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const { expenses } = this.props;
    return(
      <React.Fragment>
        {expenses.map((exp) => {
          return(
            <Text key={exp.id}>
              {exp.title}
            </Text>
          );
        })}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    expenses: state.expense.expenses
  };
};

export default connect(mapStateToProps)(ExpenseList);

