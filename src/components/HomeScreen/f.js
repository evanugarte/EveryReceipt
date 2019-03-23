import React from "react";
import { Button, Image, View } from "react-native";
import { ImagePicker } from "expo";

_pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    aspect: [4, 3],
  });

  if (!result.cancelled) {
    this.setState({ image: result.uri });
  }
};
export default class ImagePickerExample extends React.Component {

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button
          title="Pick an image from camera roll"
          onPress={_pickImage}
        />
        {image &&
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }


}