import React from "react";
import AppNavigator from "./src/navigator/AppNavigator";
import { Provider } from "react-redux";
import store from "./src/store";
<<<<<<< HEAD
import { YellowBox } from "react-native";
import _ from "lodash";

YellowBox.ignoreWarnings(["Setting a timer"]);

export default class App extends React.Component {

=======

export default class App extends React.Component {

>>>>>>> Started Integrating Redux & Firebase
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

