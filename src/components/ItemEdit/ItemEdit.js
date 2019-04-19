import React from "react";
import CommonButton from "../Common/CommonButton";
import { View, Text } from "react-native";
import { styles } from "../Common/styles";

export default class UserInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  goHome() {
    this.props.navigation.navigate("HomeScreen");
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>
          YEEEEEEEEEEEEEEEEEEEEEA
        </Text>
        <CommonButton text={"Go Back"} onPress={this.goHome.bind(this)} />
      </View>
    );
  }
}

