import React from "react";
import {
  Text,
  TouchableOpacity,
} from "react-native";
import {styles} from "../Common/styles";


export default class AddItemButton extends React.Component {

  render(){
    let { onPress } = this.props;
    return(
      <TouchableOpacity onPress={onPress}
        style={styles.btnAdd} >
        <Text style={styles.text} >{this.props.text}</Text>
      </TouchableOpacity>
    );
  }
}

