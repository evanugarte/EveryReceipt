import { createSwitchNavigator } from "react-navigation";

import LoginScreen from "../components/Auth/LoginScreen";

/**
 * Create navigator for the login screen. To navigate to this view we can
 * do: this.props.navigation.navigate("Login");
 */
const LoggedOutNavigator = createSwitchNavigator({
  LoginScreen: {
    screen: LoginScreen
  }
});

export default LoggedOutNavigator;

