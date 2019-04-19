import React from "react";
import CommonButton from "../Common/CommonButton";
import { View, Text } from "react-native";
import { styles } from "../Common/styles";
import FormFields from "../Common/FormFields";

export default class ItemInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editActive: false,
      //item fields
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

  submitEdit(id, obj) {
    
  }

  toggleEdit() {
    const { params } = this.props.navigation.state;
    const editItem = params ? params.editItem : null;
    this.setState({
      editActive: !this.state.editActive,
      id: editItem.id,
      store: editItem.store,
      items: editItem.items,
      total: editItem.total
    }, () => setTimeout(() => {}, 1500));
  }

  renderItemsFromExpense(itemList) {
    let index = 1;
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
   * id: doc.id,
   * store: curr.store,
   * items: curr.items,
   * total: curr.total
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
          editActive={true}
          expense={expense}
          submit={this.submitEdit.bind(this)}
          submitText="Save"
        />
      );
    } else {
      return (
        <React.Fragment>
          <Text style={styles.itemText}>
            Store: {editItem.store}
          </Text>
          <Text style={styles.itemText}>
            Items: 
          </Text>
          {this.renderItemsFromExpense(editItem.items)}
          <Text style={styles.itemText}>
            Total: ${editItem.total}
          </Text>
        </React.Fragment>
      );
    }
  }

  renderButtons() {
    if(this.state.editActive) {
      return (
        <CommonButton text={"Cancel"} onPress={this.toggleEdit.bind(this)} />
      );
    } else {
      return (
        <React.Fragment>
          <CommonButton text={"Edit Item"} onPress={this.toggleEdit.bind(this)} />
          <CommonButton text={"Go Back to Home"} onPress={this.goHome.bind(this)} />
        </React.Fragment>
      );
    }
  }

  goHome() {
    this.props.navigation.navigate("HomeScreen");
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

