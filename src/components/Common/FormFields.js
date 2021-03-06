import React, { Component } from "react";
import { View, TextInput, Alert } from "react-native";
import { styles } from "./styles";
import CommonButton from "./CommonButton";
import AddItemButton from "../ItemEntry/AddItemButton";

/**
 * This component renders a text entry box that is used to edit an item or
 * add an item from any of the three methods,
 */
export default class FormFields extends Component {
  constructor(props) {
    super(props);
    this.manualInput = false;
    this.total = 0;
    this.editOn = false;
    this.state = {
      pairCount: 0,
      store: "",
      total: 0,
      fields: [
        { name: "Store Name", id: "store", value: "" },
        { name: "Items", id: "items" },
        { name: "Total Amount", id: "total", value: "" },
      ],
      items: [{}]
    };
  }

  /**
   * This function resets a form to empty, in case we wish to clear all fields.
   */
  resetForm() {
    this.manualInput = false;
    this.total = 0;
    this.setState({
      pairCount: 0,
      store: "",
      total: 0,
      fields: [
        { name: "Store Name", id: "store", value: "" },
        { name: "Items", id: "items" },
        { name: "Total Amount", id: "total", value: "" },
      ],
      items: [{}]
    });
  }

  /**
   * 
   * @param {string} id the id of the text input that was changed
   * @param {string} val the value of the text input
   */
  handleChange(id, val) {
    if (id === "store") {
      for (let i = 0; i < this.state.fields.length; i++) {
        if (this.state.fields[i].id === id) {
          this.state.fields[i].value = val;
        }
      }
    } else {
      this.manualInput = true;
    }
    this.setState({
      [id]: val
    });
  }

  componentDidMount() {
    this.ensureValesSaved();
  }

  /**
   * When the FormFields UI loads, we must ensure we render all the items sent
   * to us, since this component is loaded for editing an item, a camera scan,
   * or entering an item manually
   */
  ensureValesSaved() {
    let { expense } = this.props;
    if (this.props.editActive) {
      let count = expense.items.length;
      let items = expense.items.length ? expense.items : [{}];
      this.setState({
        store: expense.store,
        total: expense.total,
        items: items,
        pairCount: count
      });
    }
    else if (this.props.fromOCR) {
      this.setState({
        store: expense.store,
        total: expense.total
      });
    }
  }

  /**
   * This function handles an item in the receipts value changing.
   * @param {int} index the index of the item that was changed
   * @param {string} type a value that is either price or name
   * @param {string} val the value of the text input box
   */
  handleItemChange(index, type, val) {
    if (type === "price") {
      this.manualInput = false;
    }
    let temp = [...this.state.items];
    if (type === "item") {
      temp[index].name = val;
    } else {
      temp[index].price = val;
    }
    this.setState({
      items: temp
    });
  }

  /**
   * This function adds an expence to Firebase after filling a receipts data 
   * out. We check the values before sending, and add a timestamp to the 
   * data. We then call on code in ExpenseActions.js
   */
  addItemToDB() {
    this.total ? this.state.total = this.total : "";
    const { items, store, total } = this.state;
    let expenseItems = [];
    let valid = true;
    for (let i = 0; i < items.length; i++) {
      if (typeof items[i].name !== "undefined" &&
        typeof items[i].price !== "undefined") {
        expenseItems.push(items[i]);
      }
    }
    if (typeof store === "undefined" || store === ""
      || total === 0 || total === "") {
      valid = false;
    }
    if (valid) {
      let itemObj = {
        timestamp: Date.now(),
        store: this.state.store,
        items: expenseItems,
        total: parseFloat(this.state.total).toFixed(2)
      };
      this.props.submit(itemObj);
      this.resetForm();
      this.editOn ? msg = "Receipt modified" : msg = "Receipt added to your list";
      Alert.alert(
        "Success!",
        msg,
        [
          { text: "OK", onPress: "" },
        ],
        { cancelable: false }
      );
    } else {
      this.props.error();
    }
  }

  /**
   * This function renders the two columns of text input for receipt values.
   * @param {boolean} isKey a parameter to specify whether we are to render a name or price input
   */
  generateKeyOrValueInputs(isKey) {
    let inputType = (isKey ? "Item name" : "Price");
    let inputId = (isKey ? "item" : "price");
    let inputElements = [];
    let tmpPrice = 0;

    if (this.props.editActive && this.props.expense.items.length !== 0) {
      this.editOn = true;
      for (let i = 0; i < this.state.pairCount; i++) {
        inputElements.push(<TextInput
          placeholder={`${inputType} ${i}`}
          defaultValue={ //sets the names and prices of the existing entries
            this.props.editActive && i < this.props.expense.items.length ?
              isKey ?
                this.props.expense.items[i].name
                : this.props.expense.items[i].price
              : ""}
          id={inputId}
          name={i}
          key={`${inputId}-${i}`}
          onChangeText={(text) => this.handleItemChange(i, inputId, text)}
        />);
      }
    } else {
      for (let i = 0; i < this.state.pairCount + 1; i++) {
        inputElements.push(<TextInput
          placeholder={`${inputType} ${i + 1}`}
          id={inputId}
          name={i}
          key={`${inputId}-${i}`}
          onChangeText={(text) => this.handleItemChange(i, inputId, text)}
          defaultValue={inputId === "item" ? this.state.items[i].name : this.state.items[i].price}
        />);
      }
    }
    if (!this.props.fromOCR) {
      for (i = 0; i < this.state.fields.length; i++) {
        if (this.editOn && this.state.fields[i].id === "store") {
          this.state.fields[i].value = this.props.expense.store;
        }
      }
      if (this.editOn) {
        this.total ? this.props.expense.total = this.total : "";
      }
      if (!this.manualInput) {
        if (inputId === "price") {
          for (let i = 0; i < this.state.items.length; i++) {
            tmpPrice = Number(tmpPrice) + Number(this.state.items[i].price);
          }
          this.total = tmpPrice;
          for (i = 0; i < this.state.fields.length; i++) {
            if (this.state.fields[i].id === "total") {
              this.total ? this.state.fields[i].name = this.total.toString() : "";
            }
          }
        }
      }
    } else {
      for (i = 0; i < this.state.fields.length; i++) {
        if (this.state.fields[i].id === "total") {
          this.state.fields[i].name = this.state.total.toString();
        }
        if (this.state.fields[i].id === "store") {
          this.state.fields[i].name = this.state.store;
          this.state.fields[i].value = this.state.store;
        }
      }
    }
    return inputElements;
  }

  /**
   * This function adds a row of item name and prices to an expense.
   */
  addKeyValuePair() {
    let oldItems = [...this.state.items];
    oldItems.push({});
    this.setState({
      items: oldItems,
      pairCount: this.state.pairCount + 1,
    });
  }

  /**
   * This function allows us to render the two columns of item values, as well
   * as a button to add a price and name pair.
   */
  renderItemsEntry() {
    let entries = [1, 0];
    return (
      <React.Fragment key={"items-entry"}>
        <View style={styles.row}>
          {entries.map((x) => {
            return (
              <View key={x} style={styles.col}>
                {this.generateKeyOrValueInputs(x)}
              </View>
            );
          })}
        </View>
        <View style={styles.row}>
          <AddItemButton
            onPress={this.addKeyValuePair.bind(this)}
            title="Add Item"
            text="Add Item"
          />
        </View>
      </React.Fragment>
    );
  }

  render() {
    return (
      <View style={styles.col}>
        {this.state.fields.map((f) => {
          return (
            f.id !== "items" && f.id != "store" ?
              <TextInput
                key={f.id}
                style={styles.input}
                defaultValue={this.props.editActive ? this.props.expense[f.id] : ""}
                textAlign="center"
                underlineColorAndroid="transparent"
                placeholder={f.name}
                onChangeText={(text) => this.handleChange(f.id, text)}
              />
              : f.id === "store" ?
                <TextInput
                  key={f.id}
                  style={styles.input}
                  defaultValue={this.props.fromOCR ? this.state.store : this.props.editActive ? this.props.expense[f.id] : ""}
                  textAlign="center"
                  underlineColorAndroid="transparent"
                  placeholder={f.name}
                  onChangeText={(text) => this.handleChange(f.id, text)}
                  value={this.props.fromOCR ? this.state.store : f.value} />
                :
                this.renderItemsEntry()
          );
        })}
        <CommonButton
          text={this.props.submitText ? this.props.submitText : "Submit"}
          onPress={this.addItemToDB.bind(this)}
        />
      </View>
    );
  }
}
