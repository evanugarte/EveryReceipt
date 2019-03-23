import React from "react";
import { 
  ImageBackground, 
  View, 
  Image,
} from "react-native";
import FullName from "./FullName";
import EmailAndPassword from "./EmailAndPassword";
import { styles } from "./styles";
import bgImage from "../../../assets/SignInBackground.png";
import logo from "../../../assets/Logo.png";
import AuthButton from "./AuthButton";
// import { connect } from "react-redux";
// import { signIn } from "../../actions/authActions";

export default class SignUpScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  }

  login(){
    // this.props.signIn(this.state);
    this.props.navigation.navigate("HomeScreen");
  }

  toggleSignUp() {
    this.props.navigation.navigate("LoginScreen");
  }

  handleChange(e){
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {
    return(
      <ImageBackground source={bgImage} style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={logo} />
        </View>
        <FullName handleChange={this.handleChange.bind(this)} />
        <EmailAndPassword handleChange={this.handleChange.bind(this)} />
        <AuthButton text="Login" onPress={this.login.bind(this)} />
        <AuthButton text="Cancel" onPress={this.toggleSignUp.bind(this)} />
      </ImageBackground>
    );
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     signIn: (creds) => dispatch(signIn())
//   };
// };

// export default connect(null, mapDispatchToProps)(SignUpScreen);

