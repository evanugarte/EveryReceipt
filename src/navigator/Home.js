import { createSwitchNavigator } from "react-navigation";

import SearchScreen from "../components/SearchScreen/SearchScreen";
import ItemEdit from "../components/ItemEdit/ItemEdit";
import HomeScreen from "../components/HomeScreen/HomeScreen";
import ManualAddScreen from "../components/ItemEntry/ManualAddScreen";
<<<<<<< 571f0a8faa685355a2c48ecd5261ec95031b6355
<<<<<<< 6705db628c12c968bd700095d0acbb17f04fad1a
<<<<<<< 6bbbb384b69ebf0c158d687f638788946371e177
=======
<<<<<<< 39ebadd2fd5c803702fcdedfc3a3416b8ad61bee
>>>>>>> Moves camera code into HomeScreen
import Profile from "../components/Profile/Profile";
<<<<<<< bcc80225dad030c43352df0ca70aa997a2fc3a91
=======
import OpenCameraRoll from "../components/ItemEntry/OpenCameraRoll";
import OpenCamera from "../components/ItemEntry/OpenCamera";
<<<<<<< 571f0a8faa685355a2c48ecd5261ec95031b6355
>>>>>>> Adds OpenCamera and OpenCameraRoll
=======
>>>>>>> Moves camera code into HomeScreen
=======
import OpenCameraRoll from "../components/ItemEntry/OpenCameraRoll";
import OpenCamera from "../components/ItemEntry/OpenCamera";
>>>>>>> Adds OpenCamera and OpenCameraRoll
=======
=======
>>>>>>> Moves camera code into HomeScreen
>>>>>>> Moves camera code into HomeScreen

/**
 * Create navigator for the home screen, which contains navigations to
 * the app's home screen or user profile.
 */
const HomeNavigator = createSwitchNavigator({
  /* this.props.navigation.navigate("SearchScreen") */
  SearchScreen: {
    screen: SearchScreen
  },
  /* this.props.navigation.navigate("ItemEdit") */
  ItemEdit: {
    screen: ItemEdit
  },
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
  },
<<<<<<< 571f0a8faa685355a2c48ecd5261ec95031b6355
<<<<<<< bcc80225dad030c43352df0ca70aa997a2fc3a91
=======
  OpenCameraRollPage: {
    screen: OpenCameraRoll
  },
  OpenCameraPage: {
    screen: OpenCamera
  }
>>>>>>> Adds OpenCamera and OpenCameraRoll
=======
>>>>>>> Moves camera code into HomeScreen
});

export default HomeNavigator;
