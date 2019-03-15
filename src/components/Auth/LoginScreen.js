import React from "react";
import { 
  Text, 
  Button, 
  ImageBackground, 
  View, 
  Image,
} from "react-native";
import EmailAndPassword from "./EmailAndPassword";
import FullName from "./FullName";
import { styles } from "./styles";
import bgImage from "../../../assets/SignInBackground.png";
import logo from "../../../assets/Logo.png";

export default class LoginScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      signUpActive: false,
      email: "",
      password: "",
    };
    this.secondaryButton = (
      <Button title="Sign Up" onPress={this.toggleSignUp.bind(this)} />
    );

    this.signUpTextEntry = (
      <React.Fragment />
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

  handleChange(e){
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleLoginOrSignUp(){
    if(!this.state.signUpActive){
      this.secondaryButton = (
        <Button title="Sign Up" onPress={this.toggleSignUp.bind(this)} />
      );
      this.signUpTextEntry = (
        <React.Fragment />
      );
    } else {
      this.secondaryButton = (
        <Button title="cancel" onPress={this.toggleSignUp.bind(this)} />
      );
      this.signUpTextEntry = (
        <FullName handleChange={this.handleChange.bind(this)} />
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
          {this.signUpTextEntry}
          <EmailAndPassword handleChange={this.handleChange.bind(this)} />
          <Text style={styles.logoText}>NO LIMIT!</Text>
          <Button title="Login" onPress={this.login.bind(this)} />
          {this.secondaryButton}
      </ImageBackground>
    );
  }
}

