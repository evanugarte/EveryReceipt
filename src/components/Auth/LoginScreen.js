import React from "react";
import { 
  Text, 
  Button, 
  ImageBackground, 
  View, 
  Image,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "./styles";
import bgImage from "../../../assets/SignInBackground.png";
import logo from "../../../assets/Logo.png";

export default class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      signUpActive: false,
      loginEntries: [
        {name: "Email", iconName: "ios-mail", secure: false}, 
        {name: "Password", iconName: "ios-mail", secure: true}
      ]
    };
    this.secondaryButton = (
      <Button title="Sign Up" onPress={this.toggleSignUp.bind(this)} />
    );
  }

  login(){
    this.props.navigation.navigate("HomeScreen");
  }

  toggleSignUp() {
    this.setState({
      signUpActive: !this.state.signUpActive
    }, this.handleLoginOrSignUp())
  }

  handleLoginOrSignUp(){
    if(!this.state.signUpActive){
      this.secondaryButton = (
        <Button title="Sign Up" onPress={this.toggleSignUp.bind(this)} />
      );
    } else {
      this.secondaryButton = (
        <Button title="cancel" onPress={this.toggleSignUp.bind(this)} />
      );
    }
  }

  signUp(){
    this.props.navigation.navigate("SignUpScreen");
  }

  render() {
    return(
      <ImageBackground source={bgImage} style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo} />
        </View>
        {this.state.loginEntries.map((x) => {
          return(
            <View>
              <Icon 
                name={x.iconName} 
                size={28} 
                color={"rgba(255,255,255,0.7)"} 
                style={styles.inputIcon}
              />
              <TextInput 
                style={styles.input}
                textAlign="center"
                placeholder={x.name}
                secureTextEntry={x.secure}
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                underlineColorAndroid= "transparent"
              />
            </View>
          );
        })}
          <Text style={styles.logoText}>NO LIMIT</Text>
          <Button title="Login" onPress={this.login.bind(this)} />
          {this.secondaryButton}
      </ImageBackground>
    );
  }
}
