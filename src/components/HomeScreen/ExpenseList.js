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

  handleDelete(id) {
    this.props.deleteExpense(id);
  }

  handleAdd() {
    this.props.addExpense({
      name: "onetwo" + Math.random(),
      date: new Date().getTime(),
      items: [
        {name: "eggie", price: 4.99},
        {name: "what!", price: 1.99}
      ],
      total: Math.floor(Math.random() * 10)
    });
  }

  render() {
    const { expenses } = this.props;
    return(
      <React.Fragment>
        {expenses.map((exp) => {
          return(
            <React.Fragment>
              <Text key={exp.id} style={{color: "black", fontSize: 30}}>
                {exp.name}
              </Text>
              {exp.expenses.map((x) => {
                return (
                  <Text>
                    {x.name} , ${x.price}
                  </Text>
                );
              })}
              <Text>
                total: {exp.total}
              </Text>
              <Button title="x"
                onPress={() => {  
                  this.handleDelete(exp.id);
                }} />
              />
            </React.Fragment>
          );
        })}
        <Button title="yeah"
          onPress={() => {  
            this.handleAdd();
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

