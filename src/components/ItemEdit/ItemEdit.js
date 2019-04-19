import React from "react";
import CommonButton from "../Common/CommonButton";
import { View, Text } from "react-native";
import { styles } from "../Common/styles";

export default class ItemInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null
    };
  }

  componentDidMount() {
    this.setState({
      item: this.props.navigation.state.params.item
    });
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

  goHome() {
    this.props.navigation.navigate("HomeScreen");
  }
  
  render() {
    return (
      <View style={styles.container}>
        {this.getExpenseInfo()}
        <CommonButton text={"Go Back"} onPress={this.goHome.bind(this)} />
      </View>
    );
  }
}

