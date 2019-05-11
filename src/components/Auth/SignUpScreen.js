import React from "react";
import {
  ImageBackground,
  View,
  Image, Text,
} from "react-native";
import FullName from "./FullName";
import EmailAndPassword from "./EmailAndPassword";
import { styles } from "../Common/styles";
import bgImage from "../../../assets/SignInBackground.png";
import logo from "../../../assets/Logo.png";
import CommonButton from "../Common/CommonButton";
import firebase from "firebase";
import { connect } from "react-redux";
import { signUp } from "../../actions/authActions";

class SignUpScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      buttons: [
        {text: "Sign Up"},
        {text: "Cancel"},
      ],
      clicked: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.props.navigation.navigate(user ? "HomeScreen" : "SignUpScreen");
    });
  }

  /** 
   * This function signs the user up, on the condition that the password is
   * longer than 5 characters.
   */
  login(){
    if (this.state.password.length < 6){
      return;
    }
    this.props.signUp(this.state);
  }

  /** 
   * This function navigates us back to the login screen.
   */
  toggleSignUp() {
    this.props.navigation.navigate("LoginScreen");
  }

  /** 
   * This function saves any changes due to inputs being entered.
   */
  handleChange(id, value){
    this.setState({
      [id]: value,
      clicked: false
    });
  }

  /**
   * this function handles a button press. There are two buttons on the 
   * sign up screen, so we will either navigate to login screen or sign the user up.
   */
  isClicked = (any) => {
    if(any === "Sign Up") {
      this.setState({clicked: true});
      this.login();
    }
    if(any === "Cancel") this.toggleSignUp();
  }

  render() {
    const { authError } = this.props;
    const clicked = this.state.clicked;
    return(
      <ImageBackground source={bgImage} style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo} />
        </View>
        <FullName handleChange={this.handleChange.bind(this)} />
        <EmailAndPassword handleChange={this.handleChange.bind(this)} />
        {this.state.buttons.map((btn) => {
          return (
            <CommonButton 
              key={btn.text}
              onPress={() => this.isClicked(btn.text)}
              text={btn.text}
            />
          );
        })}
        <Text style={styles.errorText}>
          {clicked && this.state.firstName === "" ? "Enter your first name.": ""}
          {clicked && this.state.firstName !== "" && this.state.lastName === "" ? "Enter your last name.": ""}
          {clicked && this.state.firstName !== "" && this.state.lastName !== "" && this.state.email === "" ? "Enter your email.": ""}
          {clicked && this.state.firstName !== "" && this.state.lastName !== "" && this.state.email !== "" && this.state.password.length < 6 ? "Password must be at least six characters long.": ""}
          {authError && this.state.email !== "" && this.state.password.length >= 6 && this.state.firstName !== "" && this.state.lastName !== "" ? "Sign Up Failed." : ""}
        </Text>
      </ImageBackground>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);

