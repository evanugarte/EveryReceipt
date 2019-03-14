import React from "react";
import { Text, Button } from "react-native"

export default class Title extends React.Component {
  constructor(props){
    super(props);
  }

  login(){
    console.log("yeah");
    this.props.navigation.navigate("HomeScreen");
  }

  render() {
    return(
      <React.Fragment>
        <Button title="Login" onPress={this.login.bind(this)}>You moved to memphis from @#%$!</Button>
        <Text>No Limi t</Text>
      </React.Fragment>
    );
  }
}
