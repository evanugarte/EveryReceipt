import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import FormFields from "./FormFields";
import { styles } from "../Common/styles";

export default class ManualAddScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      items: [],
      total: 0
    };
  };

  handleGoBack() {
    this.props.navigation.navigate("HomeScreen");
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handleGoBack.bind(this)}>
          <Text>
            Cancel
          </Text>
        </TouchableOpacity>
        <FormFields />
      </View>
    );
  }
}








