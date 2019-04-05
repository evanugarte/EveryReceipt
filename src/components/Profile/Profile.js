import React from "react";
import { View, StyleSheet, Button, Text } from "react-native";
import { connect } from "react-redux";
import UserInfo from "./UserInfo";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }
  
  async onLogout() {
    this.props.navigation.navigate("LoggedOut");
  }
  
  async goToHome() {
    this.props.navigation.navigate("HomeScreen");
  }
  
  render() {
    const { profile } = this.props;
    return (
      <View style={styles.base}>
        <UserInfo profile={profile} />
        <Button
          title="Logout"
          onPress={this.onLogout.bind(this)} />
        <Button title="Home" onPress={this.goToHome.bind(this)} />
        <Text>We out here</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile
  };
};

export default connect(mapStateToProps)(Profile);

