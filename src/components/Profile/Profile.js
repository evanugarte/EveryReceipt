import React from "react";
import { View, CameraRoll } from "react-native";
import { connect } from "react-redux";
import UserInfo from "./UserInfo";
import CommonButton from "../Common/CommonButton";
import firebase from "firebase";
import { styles } from "../Common/styles";
import { signOut } from "../../actions/authActions";

/**
 * This component accounts for the Profile Screen's UI, showing user name and
 * buttons to view all expenses.
 */
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttons: [
        {name: "Screenshot all expenses", callback: this.seeAllExpenses.bind(this)},
        {name: "Logout", callback: this.logout.bind(this)}
      ]
    };
  }
  
  /**
   * This function navigates us to the view for viewing all of the user's 
   * expenses.
   */
  async seeAllExpenses() {
    this.props.navigation.navigate("AllExpenses");
  }

  /**
   * This function logs the user out.
   */
  async logout() {
    this.props.signOut();
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.props.navigation.navigate(user ? "HomeScreen" : "LoggedOut");
    });
  }
  
  render() {
    const { profile } = this.props;
    return (
      <View style={styles.container} ref={this.imgRef}>
        <UserInfo profile={profile} />
        {this.state.buttons.map((btn) => {
          return (

            <CommonButton
              key={btn.name}
              text={btn.name} 
              onPress={btn.callback}
            />
          );
        })}
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  };
};

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

