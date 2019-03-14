import { createStackNavigator } from "react-navigation";

import LoginScreen from "../components/Login/LoginScreen";

/**
 * Create navigator for the login screen. To navigate to this view we can
 * do: this.props.navigation.navigate("Login");
 */
const LoggedOutNavigator = createStackNavigator({
  LoggedOut: {
    screen: LoginScreen
  }
});

export default LoggedOutNavigator;

