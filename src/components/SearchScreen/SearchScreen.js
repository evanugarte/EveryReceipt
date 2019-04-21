import React from "react";
import { 
  View
} from "react-native";
import { styles } from "../Common/styles";
import SearchBar from "./SearchBar";
import CommonButton from "../Common/CommonButton";

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onQueryChange() {

  }

  handleSearch() {

  }

  goHome() {
    this.props.navigation.navigate("HomeScreen");
  }

  render() {
    return(
      <View style={styles.row}>
        <CommonButton 
          onPress={this.goHome.bind(this)}
          text="Go Home"
        />
        <SearchBar 
          onQueryChange={this.onQueryChange.bind(this)}
          handleSearch={this.handleSearch.bind(this)} />
      </View>
    );
  }
}

