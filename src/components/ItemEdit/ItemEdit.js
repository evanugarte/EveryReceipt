import React from "react";
import CommonButton from "../Common/CommonButton";
import { View, Text } from "react-native";
import { styles } from "../Common/styles";
import FormFields from "../Common/FormFields";
import { editExpense } from "../../actions/expenseActions";
import { connect } from "react-redux";

/**
 * This component holds the UI for what the user sees when an item is to be
 * edited. Users tap on an item and are brought to this page, where they can
 * choose to render FormFields to edit.
 */
class ItemEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editActive: false,
      prevouslyEdited: false,
      error: false,
      id: "",
      store: "",
      items: [{}],
      total: ""
    };
  }

  componentDidMount() {
    this.setState({
      item: this.props.navigation.state.params.item
    });
  }

  /**
   * If the user did not enter a correct value, we set this state variable
   * to true, and display a modal.
   */
  showError() {
    this.setState({
      error: true
    });
  }

  /**
   * If the user was editing an item and wishes to save the changes, 
   * this function is called to do to.
   * @param {object} expense the expense to be updated.
   */
  submitEdit(expense) {
    this.setState({
      store: expense.store,
      items: expense.items,
      total: expense.total
    }, () => setTimeout(() => {}, 1500));
    this.props.editExpense(this.state.id, expense);
    this.hideEditor();
  }

  /**
   * When the user clicks save or cancel when in edit mode, this function is
   * called to hide FormFields, and only show non text entry data.
   */
  hideEditor() {
    this.setState({
      prevouslyEdited: true,
      editActive: false,
    });
  }

  /**
   * To open the editor, this function is called, and we set the state of the
   * component to render the data in text fields.
   */
  openEditor() {
    if(!this.state.prevouslyEdited) {
      const { params } = this.props.navigation.state;
      const editItem = params ? params.editItem : null;
      this.setState({
        id: editItem.id,
        store: editItem.store,
        items: editItem.items,
        total: editItem.total
      }, () => setTimeout(() => {}, 1500));
    }
    this.setState({
      editActive: true
    });
  }

  /**
   * This function renders any and all items from a receipt.
   * @param {array} itemList 
   */
  renderItemsFromExpense(itemList) {
    let index = 1;
    if(itemList.length === 0) {
      return (
        <React.Fragment>
          <Text style={styles.itemSubText}>No Items.</Text>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        {itemList.map((item) => {
          return (
            <Text 
              key={Math.random(100)}
              style={styles.itemSubText}  
            >
              {index++}.  {item.name}, ${item.price}
            </Text>
          );
        })}
      </React.Fragment>
    );
  }

  /**
   * This function is called to render the most up to date receipt data from the user.
   */
  getExpenseInfo() {
    const { params } = this.props.navigation.state;
    const editItem = params ? params.editItem : null;
    if(this.state.editActive)
    {
      const expense = {
        store: this.state.store,
        items: this.state.items,
        total: this.state.total
      };
      return(
        <FormFields
          error={this.showError.bind(this)}
          editActive={true}
          expense={expense}
          submit={this.submitEdit.bind(this)}
          submitText="Save"
        />
      );
    } else {
      const { prevouslyEdited } = this.state;
      return (
        <React.Fragment>
          <Text style={styles.itemText}>
            Store: {prevouslyEdited ? this.state.store : editItem.store}
          </Text>
          <Text style={styles.itemText}>
            Items: 
          </Text>
          {this.renderItemsFromExpense(
            prevouslyEdited ? this.state.items : editItem.items
          )}
          <Text style={styles.itemText}>
            Total: ${prevouslyEdited ? this.state.total : editItem.total}
          </Text>
        </React.Fragment>
      );
    }
  }

  /**
   * Whether the FormFields is visible or not, we must ensure to render the
   * right buttons. If edit is active we show a cancel option, and if not
   * we show the options to go back to the parent view or to edit an item.
   */
  renderButtons() {
    if(this.state.editActive) {
      return(
        <React.Fragment>
          <Text style={{ color: "red" }}>{this.state.error ? "Please enter valid fields." : ""}</Text>
          <CommonButton text={"Cancel"} onPress={this.hideEditor.bind(this)} />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <CommonButton text={"Edit Item"} onPress={this.openEditor.bind(this)} />
          <CommonButton text={"Go Back"} onPress={this.goHome.bind(this)} />
        </React.Fragment>
      );
    }
  }

  /**
   * This function navigates us to the parent view.
   */
  goHome() {
    const { params } = this.props.navigation.state;
    const searchActive = params ? params.searchActive : null;
    const prevQuery = params ? params.query : null;
    const prevQueryType = params ? params.queryType : null;
    this.props.navigation.navigate(
      typeof searchActive !== "undefined" ? 
        "SearchScreen" :
        "HomeScreen",
      {
        query: prevQuery,
        queryType: prevQueryType
      }
    );
  }
  
  render() {
    return (
      <View style={styles.container}>
        {this.getExpenseInfo()}
        {this.renderButtons()}
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editExpense: (id, expense) => dispatch(editExpense(id, expense))
  };
};

export default connect(null, mapDispatchToProps)(ItemEdit);

