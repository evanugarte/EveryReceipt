import React from "react";
import {TouchableOpacity, Text, View, ScrollView} from "react-native";
import AddButton from "./AddButton.js";
import ExpenseList from "../Common/ExpenseList.js";
import CommonButton from "../Common/CommonButton.js";
import firebase from "firebase";
import { styles } from "../Common/styles";
import { getExpenses, addExpense, deleteExpense } from "../../actions/expenseActions";
import { connect } from "react-redux";
import { signOut } from "../../actions/authActions";
import { ImagePicker, Permissions, Constants } from "expo";


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      buttons: [
        {title: "Logout", onPress: this.logout.bind(this)},
        {title: "Profile", onPress: this.goToProfile.bind(this)},
        {title: "Search Expenses", onPress: this.goToSearch.bind(this)}
      ]
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.props.navigation.navigate(user ? "HomeScreen" : "LoggedOut");
    });
    this.props.getExpenses();
  }


  handleDelete(id) {
    this.props.deleteExpense(id);
  }

  logout() {
    this.props.signOut();
  }

  goToProfile() {
    this.props.navigation.navigate("Profile");
  }

  goToSearch() {
    this.props.navigation.navigate("SearchScreen");
  }

  toggleEdit(item) {
    this.props.navigation.navigate("ItemEdit", {
      editItem: item
    });
  }

  handlePress(btnId) {
    if (btnId === "manual")
      this.props.navigation.navigate("ManualAddScreen");
  }

  handleCloudOCR = async (uri) => {
    try {
      let body = JSON.stringify({
        requests: [
          {
            features: [
              { type: "TEXT_DETECTION", maxResults: 10 },
            ],
            image: {
              content: uri
            }
          }
        ]
      });
      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
          "API_KEY",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: body
        }
      );
      
      let responseJson = response.json();
      console.log(response);
    } catch(err) {
      // console.error(err);
    }
  }

  useCameraHandler = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      // aspect: [1, 2],
      base64: true,
    });
    this.setState({ result });
    setTimeout(() => {}, 2000);
    this.handleCloudOCR(result.base64);
  };
  useLibraryHandler = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      // aspect: [1, 2],
      base64: true,
    });
    this.setState({ result });
    this.handleCloudOCR(result.base64);
  };

  handlePress(btnId) {
    if (btnId === "manual")
      this.props.navigation.navigate("ManualAddScreen");
    if (btnId === "roll")
      this.useLibraryHandler();
    if (btnId === "camera")
      this.useCameraHandler();
  }

  render() {
    const { expenses } = this.props;
    return (
      <React.Fragment>
        <AddButton handlePress={this.handlePress.bind(this)} />
        <View style={styles.container}>
          {this.state.buttons.map((btn) => {
            return (
              <CommonButton
                key={btn.title}
                text={btn.title}
                onPress={btn.onPress}
              />
            );
          })}
          <ScrollView>
            <ExpenseList
              expenses={expenses}
              deleteExpense={this.handleDelete.bind(this)}
              toggleEdit={this.toggleEdit.bind(this)} />
          </ScrollView>
        </View>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    getExpenses: () => dispatch(getExpenses()),
    deleteExpense: (id) => dispatch(deleteExpense(id))
  };
};

const mapStateToProps = (state) => {
  return {
    expenses: state.expense.expenses
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

