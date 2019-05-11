import React from "react";
import { Text, View, ScrollView, Alert} from "react-native";
import AddButton from "./AddButton.js";
import ExpenseList from "../Common/ExpenseList.js";
import firebase from "firebase";
import { styles } from "../Common/styles";
import { getExpenses, deleteExpense, handleCloudOCR } from "../../actions/expenseActions";
import { connect } from "react-redux";
import { signOut } from "../../actions/authActions";
import { ImagePicker, Permissions } from "expo";

/**
 * This component renders the UI that the user will first see after the 
 * user logs in. This component holds an add button and list of expenses.
 */
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      buttons: [
        {title: "Logout", onPress: this.logout.bind(this)},
      ],
      modalVisible: false,
      valueParsed: false,
      parsedObj: { }
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.props.navigation.navigate(user ? "HomeScreen" : "LoggedOut");
    });
    this.props.getExpenses();
  }

  setModalVisible() {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }

  /**
   * This function is initially called on my FormFields. We pass the call
   * to expenseActions.js to delete an item by id.
   */
  handleDelete(id) {
    this.props.deleteExpense(id);
  }

  /** This function logs user out and sends user to the login screen */
  logout() {
    this.props.signOut();
  }

  /** This function sends user to edit screen when user taps on the receipt, 
   * with the selected receipt as a parameter.
  */
  toggleEdit(item) {
    this.props.navigation.navigate("ItemEdit", {
      editItem: item
    });
  }

  /**
   * This function handles the press of our add button. If the id is the
   * string "manual", then we navigate to add the item manuall.
   * @param {string} btnId 
   */
  handlePress(btnId) {
    if (btnId === "manual")
      this.props.navigation.navigate("ManualAddScreen");
  }

  /**
   * This function calls on code in expenseActions.js, which calls the 
   * Google Cloud API to get the image text.
   */
  getReceiptText = async (uri) => {
    if (typeof uri === "undefined") return;
    
    let resObj = await handleCloudOCR(uri);  
    if(resObj.total !== "" || resObj.store !== "") {
      this.setState({
        valueParsed: true
      });
      this.handleAddingOCRItem(resObj);
    } else {
      this.openAlert();
    }
  }

  /**
   * After getting a value from google cloud, if it is in fact valid, we 
   * will navigate to the manual add screen for the user to edit the parsed
   * values.
   * @param {object} item 
   */
  handleAddingOCRItem(item) {
    if(this.state.valueParsed) {
      this.props.navigation.navigate("ManualAddScreen", {
        ocrValue: item
      });
    }
  }

  /**
   * This function opens the user's camera
   */
  useCameraHandler = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      base64: true,
    });
    this.getReceiptText(result.base64);
  };

  /**
   * This function opens the user's photo library
   */
  useLibraryHandler = async () => {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
    });
    this.setState({ result });
    this.getReceiptText(result.base64);
  };

  /**
   * This function handles the event where the user selects an option from
   * the red add button. Depending on the choice, we either open the camera,
   * photo library, or navigate to the manual add screen
   */
  handlePress(btnId) {
    if (btnId === "manual")
      this.props.navigation.navigate("ManualAddScreen");
    if (btnId === "roll")
      this.useLibraryHandler();
    if (btnId === "camera")
      this.useCameraHandler();
  }

  /**
   * This function either renders a list of user's expenses from firebase, or
   * a statement that the list is empty.
   */
  renderExpenseList() {
    const { expenses } = this.props;
    if(expenses.length === 0) {
      return (<Text style={styles.logoText}>You don't have any expenses! Add some below.</Text>);
    } else {
      return (
        <React.Fragment>
          <Text style={styles.logoText}>Receipt List</Text>
          <ExpenseList
            expenses={expenses}
            deleteExpense={this.handleDelete.bind(this)}
            toggleEdit={this.toggleEdit.bind(this)} />
        </React.Fragment>
      );
    }
  }

  /**
   * If Google wasn't able to parse our values. We alert the user that a value couldn't be parsed
   */
  openAlert() {
    Alert.alert(
      "Sorry, we couldn't read your receipt!",
      "",
      [
        { text: "Close", onPress: "" },
      ],
      {cancelable: false}
    );
  };

  render() {
    const { expenses } = this.props;
    return (
      <React.Fragment>
        <AddButton handlePress={this.handlePress.bind(this)} />
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
            {this.renderExpenseList()}
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

