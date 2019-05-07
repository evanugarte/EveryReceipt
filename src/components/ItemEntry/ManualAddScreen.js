import React, { Component } from "react";
import {Button, View} from "react-native";
import FormFields from "./../Common/FormFields";
import { styles } from "../Common/styles";
import { addExpense } from "../../actions/expenseActions";
import { connect } from "react-redux";

class ManualAddScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ocrActive: false
    };
    this.ocrItem = {};
  };

  componentDidMount() {
    const { params } = this.props.navigation.state;
    const ocrValue = params ? params.ocrValue : null;
    if(ocrValue !== null) {
      this.setState({
        ocrActive: true,
      });
      let expense = {
        store: ocrValue.store,
        items: [],
        total: ocrValue.total
      };
      this.ocrItem = expense;
      console.log(`store in manual add: ${expense.store}`);
      console.log(`total in manual add: ${expense.total}`);
      
    }
  }

  handleGoBack() {
    this.props.navigation.navigate("HomeScreen");
  }

  addExpense(item) {
    this.props.addExpense(item);
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="back" onPress={this.handleGoBack.bind(this)}>
        </Button>
        {this.state.ocrActive ? 
          <FormFields 
            editActive={true}
            expense={this.ocrItem}
            submit={this.addExpense.bind(this)}/>
          :
          <FormFields submit={this.addExpense.bind(this)}/>
        }
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addExpense: (item) => dispatch(addExpense(item))
  };
};

export default connect(null, mapDispatchToProps)(ManualAddScreen);






