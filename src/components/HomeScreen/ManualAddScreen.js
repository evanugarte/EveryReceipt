import React, { Component } from "react";
import {
  Text,
  Button,
  ImageBackground,
  View,
  Image,
  TextInput,
} from "react-native";


export default class ManualAddScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entiesFields: [
        { date: "Date", id: "date" },
        { storeName: "Store Name", id: "storeName" },
        { total: "Total Amount", id: "totalAmount" }
      ]
    };
  }

  render() {
    return (
      <React.Fragment>
        {this.state.entiesFields.map((x) => {
          return (
            <View key={x.id} style={styles.inputContainer}>
              <Icon
                name="ios-contact"
                size={28}
                color="rgba(255,255,255,0.7)"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                id={x.id}
                onChange={this.props.handleChange.bind(this)}
                textAlign="center"
                placeholder={x.name}
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                underlineColorAndroid="transparent"
              />
            </View>
          );
        })}
      </React.Fragment>
    );
  }
}
