import React from "react";
import { 
  Text,
  TouchableOpacity,
} from "react-native";
import { styles } from "../Common/styles.js";

/**
 * This is a generic class that renders a botton UI that is used throughout
 * EveryReceipt.
 */
export default class CommonButton extends React.Component {
  render(){
    let { onPress, text } = this.props;
    let txtStyle = txtStyle in this.props ? this.props.txtStyle : styles.text;
    let btnStyle = btnStyle in this.props ? this.props.btnStyle : styles.btnLogin;

    return(
      <TouchableOpacity onPress={this.props.onPress}
        style={btnStyle} >
        <Text style={txtStyle} >{text}</Text>
      </TouchableOpacity>
    );
  }
}

