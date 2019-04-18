import { createSwitchNavigator } from "react-navigation";

import HomeScreen from "../components/HomeScreen/HomeScreen";
import ManualAddScreen from "../components/ItemEntry/ManualAddScreen";
import Profile from "../components/Profile/Profile";

/**
 * Create navigator for the home screen, which contains navigations to
 * the app's home screen or user profile.
 */
const HomeNavigator = createSwitchNavigator({
  /* this.props.navigation.navigate("HomeScreen") */
  HomeScreen: {
    screen: HomeScreen
  },
  /* this.props.navigation.navigate("Profile") */
  Profile: {
    screen: Profile
  },
  /* this.props.navigation.navigate("ManualAddScreen") */
  ManualAddScreen: {
    screen: ManualAddScreen
  }
});

export default HomeNavigator;
