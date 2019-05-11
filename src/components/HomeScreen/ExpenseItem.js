import React from "react";
import { View, TouchableOpacity, Text, Button, Alert } from "react-native";
import { styles } from "../Common/styles";

/**
 * This component renders any and all information to an expense, which includes
 * items bought, store name and total. This component is used anywhere an
 * ExpenseList is rendered.
 */
export default class ExpenseItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayOnly: false,
      modalVisible: false
    };
  }

  componentDidMount() {
    this.setState({
      displayOnly: typeof this.props.displayOnly !== "undefined"
    });
  }

  /**
   * To make sure a user doesn't delete an receipt on accident, we ask if this
   * receipt is really what the user would like to delete
   */
  confirm = (item) => {
    Alert.alert(
      "Are you sure you want to delete this entry?",
      `${item.store}, ${item.items.length} items, $${item.total}`,
      [
        { text: "Yes", onPress: () => this.props.handleDelete(item.id)},
        { text: "Cancel", onPress: "", style: "cancel" }
      ],
      {cancelable: false}
    );
  };

  /**
   * This function uses a variable to check whether to delete an item or not.
   * If we are displaying items only, then we don't render the red x.
   * @param {object} item the item that is to have the delete button attached
   */
  renderDeleteButton(item) {
    if(this.state.displayOnly) {
      return;
    } else {
      return (
        <View style={styles.deleteBtn}>
          <Button title="x" color="#ff0000"
            onPress={() =>
              this.confirm(item)
            } />
        </View>
      );
    }
  }

  /**This function handles edit of an item */
  handleEdit(item) {
    if(!this.state.displayOnly) {
      this.props.toggleEdit(item);
    }
  }

  render() {
    let { item } = this.props;
    return (
      <View key={item.id} style={styles.expensePadding}>
        <View key={item.id}>
          <TouchableOpacity onPress={() => this.handleEdit(item)}>
            <Text key={item.id} style={styles.itemText}>
              {item.store}
            </Text>
            {
              typeof item.items.length === 0 ? <React.Fragment/> :
                item.items.map((x, key) => {
                  return (
                    <React.Fragment key={key}>
                      {x.name !== "" && x.price !== "" 
                        && typeof x.name !== "undefined" 
                        && typeof x.price !== "undefined"?
                        <Text>
                          {x.name} , ${x.price}
                        </Text>
                        : <React.Fragment/>
                      }
                    </React.Fragment>
                  );
                })
            }
            <Text style={{fontSize: 20}}>
              total: ${item.total}
            </Text>
          </TouchableOpacity>
        </View>
        {this.renderDeleteButton(item)}
      </View>
    );
  }

}

