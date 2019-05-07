import React from "react";
import { Modal, ActivityIndicator, View, ScrollView} from "react-native";
import AddButton from "./AddButton.js";
import ExpenseList from "../Common/ExpenseList.js";
import CommonButton from "../Common/CommonButton.js";
import firebase from "firebase";
import { styles } from "../Common/styles";
import { getExpenses, addExpense, deleteExpense } from "../../actions/expenseActions";
import { connect } from "react-redux";
import { signOut } from "../../actions/authActions";
import { key } from "../../config/api_key";
import { ImagePicker, Permissions, Constants } from "expo";


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
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
    if (typeof uri === "undefined") return;
    
    try {
      let body = JSON.stringify({
        requests: [
          {
            features: [
              { type: "DOCUMENT_TEXT_DETECTION", maxResults: 10 },
            ],
            image: {
              content: uri
            }
          }
        ]
      });
      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
          key,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: body
        }
      );
      
      let test = JSON.stringify(response);
      test = 
        test.substring(
          test.lastIndexOf("\"text\\"), test.lastIndexOf("}"));
      test = test.split("\\n");

      let result = -1;
      for(var i in test) {
        console.log(test[i]);
        if(test[i].toLowerCase().indexOf("total") !== -1 &&
        test[i].toLowerCase().indexOf("subtotal") === -1) {
          console.log(test[i].match(/\d+(?:\.\d+)?/g));
          let total = test[i].match(/\d+(?:\.\d+)?/g);
          if(total !== null) {
            result = test[i].match(/\d+(?:\.\d+)?/g)[0];
          }
          break;
        }
      }
      if(result !== -1) {
        console.log(`total: ${result}`);
      } else {
        console.log("didn't work.");
        
      }
      console.log("done.");
      
      this.setState({
        loading: false
      });
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
    this.setState({ 
      loading: true
    });
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
          {/* {this.state.loading ? 
            <Modal
              transparent={false}
              animationType={"none"}
              visible={this.state.loading}
              onRequestClose={() => {}} >
              <View style={styles.container}>
                <View style={styles.activityIndicatorWrapper}>
                  <ActivityIndicator
                    animating={this.state.loading} />
                </View>
              </View>
            </Modal> 
            : null} */}
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

