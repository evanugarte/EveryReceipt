import React, { Component } from "react";
import { StyleSheet, NativeModules } from "react-native";
import { ImagePicker, Permissions, Constants } from "expo";
import {styles} from "../Auth/styles";

export default class OpenCameraRoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
    };
  };
  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };
  useLibraryHandler = async () => {
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: false,
    });
    this.setState({ result });
  };
  render() {
    return (
      <View style={styles.container}>
        { this.useLibraryHandler() }
      </View>
    );
  }
}