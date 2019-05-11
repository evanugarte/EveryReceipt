import React from "react";
import ExpenseItem from "../HomeScreen/ExpenseItem";

/**
 * This component renders the list of expenses, that can be seen on our home
 * page, seach page and page where we list all items to export a file from.
 */
export default class ExpenseList extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * This function handles the user wishing to delete an item. We then call on
   * a function sent as a prop to handle the delete event
   * @param {string} id the id of the expense to be deleted
   */
  handleDelete(id) {
    this.props.deleteExpense(id);
  }

  render() {
    const { expenses } = this.props;
    return(
      <React.Fragment>
        {expenses.map((exp, key) => {
          return(
            <ExpenseItem 
              key={key} 
              handleDelete={this.handleDelete.bind(this)}
              toggleEdit={this.props.toggleEdit.bind(this)}
              item={exp} />
          );
        })}
      </React.Fragment>
    );
  }
}
