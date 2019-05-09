import React, { Component } from "react";
import { View, TextInput } from "react-native";
import { styles } from "./styles";
import CommonButton from "./CommonButton";
import AddItemButton from "../ItemEntry/AddItemButton";



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
      items: [{}],
      tmpItems: [{}]
    };
  }

  resetForm() {
    this.manualInput = false;
    this.total = 0;
    this.setState({
      pairCount: 0,
      store: "",
      fields: [
        { name: "Store Name", id: "store", value: "" },
        { name: "Items", id: "items" },
        { name: "Total Amount", id: "total", value: "" },
      ],
      items: [{}]
    });

  }

  handleChange(id, val) {
    for (let i = 0; i < this.state.fields.length; i++) {
      if (id === "store") {
        this.state.fields[i].value = val;
      }
    }
    if (id === "total") {
      this.total = val;
      this.manualInput = true;
    }
    this.setState({
      [id]: val
    });

  }

  componentDidMount() {
    this.ensureValesSaved();
  }

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
  handleItemChange(index, type, val) {
    if (type === "price") {
      this.manualInput = false;
    }
    let temp = [...this.state.items];
    if (type === "item") {
      temp[index].name = val;

    } else {
      // temp[index].price = parseFloat(val).toFixed(2);
      temp[index].price = val;

    }

    this.setState({
      items: temp
    });

  }

  addItemToDB() {
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
        total: parseFloat(this.total).toFixed(2)
        // total: parseFloat(this.state.total).toFixed(2)
      };
      this.props.submit(itemObj);
    } else {
      this.props.error();
    }

  }

  generateKeyOrValueInputs(isKey) {
    console.log("call generate")
    // console.log(this.state.items)
    let inputType = (isKey ? "Item name" : "Price");
    let inputId = (isKey ? "item" : "price");
    let inputElements = [];
    let tmpPrice = 0;

    // console.log("this.props.editActive", this.props.editActive)
    // console.log("this.props.expense.items.length", this.props.expense.items.length)
    if (this.props.editActive) {
      this.editOn = true;
    }
    // if (this.props.editActive && this.props.expense.items.length !== 0) {

    if (this.props.editActive && this.state.items !== 0) {
      console.log("frop in first loop")
      console.log(expenseItems)
      this.editOn = true;
      for (let i = 0; i < this.state.pairCount; i++) {
        inputElements.push(<TextInput
          placeholder={`${inputType} ${i}`}
          defaultValue={
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
        console.log("drop in second  loop")
        console.log(this.state.items)
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


    //updating the name of the total field aka updating UI

    // if (this.manualInput === false) {
    //   if (inputId === "price") {
    //     for (let i = 0; i < this.state.items.length; i++) {
    //       tmpPrice = Number(tmpPrice) + Number(this.state.items[i].price);
    //     }
    //     this.total = tmpPrice;
    //     for (i = 0; i < this.state.fields.length; i++) {
    //       if (this.state.fields[i].id === "total") {
    //         this.total ? this.state.fields[i].name = this.total.toString() : "";
    //       }
    //       if (this.editOn === true && this.state.fields[i].id === "store") {
    //         console.log("here", this.state.store)
    //         this.state.fields[i].name = this.state.store;

    //       }
    //     }
    //   }
    // }

    if (this.editOn === true) {
      console.log("if (this.editOn === true)")
      // console.log(this.total, this.state.total)
      this.total ? this.state.total = this.total : "";
    }
    if (!this.manualInput) {

      if (inputId === "price") {
        for (let i = 0; i < this.state.items.length; i++) {
          tmpPrice = Number(tmpPrice) + Number(this.state.items[i].price);
        }
        this.total = tmpPrice;
        // console.log(this.total)
        for (i = 0; i < this.state.fields.length; i++) {
          if (this.state.fields[i].id === "total") {
            console.log("here")
            console.log(this.total, this.state.total)
            this.total ? this.state.fields[i].name = this.total.toString() : "";

          }

        }

      }
    }

    return inputElements;
  }

  addKeyValuePair() {
    let oldItems = [...this.state.items];
    oldItems.push({});
    this.setState({
      items: oldItems,
      pairCount: this.state.pairCount + 1,
    });
  }

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
    // return (
    //   <View style={styles.col}>
    //     {this.state.fields.map((f) => {
    //       return (
    //         f.id !== "items" ?
    //           <TextInput
    //             key={f.id}
    //             style={styles.input}
    //             defaultValue={this.props.editActive || this.props.fromOCR
    //               ? this.props.expense[f.id] : ""}
    //             textAlign="center"
    //             underlineColorAndroid="transparent"
    //             placeholder={f.name}
    //             onChangeText={(text) => this.handleChange(f.id, text)}
    //           />
    //           :
    //           this.renderItemsEntry()
    //       );
    //     })}
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
              // value={this.total}

              />
              : f.id === "store" ?
                <TextInput
                  key={f.id}
                  style={styles.input}
                  defaultValue={this.props.editActive ? this.props.expense[f.id] : ""}
                  textAlign="center"
                  underlineColorAndroid="transparent"
                  placeholder={f.name}
                  onChangeText={(text) => this.handleChange(f.id, text)}
                  value={f.value} />
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


