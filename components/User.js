import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { withNavigation } from "react-navigation";
import { Avatar, Text } from "react-native-elements";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import _ from "lodash";

import images from "./images";

const { width } = Dimensions.get("window");

class User extends React.Component {
  state = {
    data: this.props.data
  };

  disconnect = async () => {
    try {
      await AsyncStorage.removeItem("@annihimal:user");
      this.props.navigation.navigate("Register", { param: true });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { email, username } = this.state.data.user;
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.disconnect} style={styles.logout}>
          <FontAwesome5
            name="power-off"
            size={26}
            style={{ marginBottom: -3 }}
            color="red"
          />
        </TouchableOpacity>
        <Avatar size="xlarge" source={images.user} rounded />
        <Text h4>{username}</Text>
        <Text>{email}</Text>
      </View>
    );
  }
}

export default withNavigation(User);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    padding: 8,
    marginTop: 30,
    width: width - 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.05,
    shadowRadius: 1
  },
  logout: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: "flex-end",
    margin: 8,
    position: "absolute"
  }
});
