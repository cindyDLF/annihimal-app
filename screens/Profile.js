import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import Side from "../components/Side";
import Colors from "../constants/Colors";

const { height, width } = Dimensions.get("window");

class Profile extends Component {
  state = {
    user: {},
    isLoading: true
  };
  componentWillMount() {
    this.retrieveData();
  }
  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@annihimal:user");
      if (value !== null) {
        // We have data!!
        const user = JSON.parse(value);
        this.setState({ user, isLoading: false });
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  render() {
    //console.log(this.state.user);
    const { user, isLoading } = this.state;
    if (!isLoading) {
      return (
        <View style={styles.container}>
          <Text>{user.user.username}</Text>
        </View>
      );
    } else {
      return <ActivityIndicator size="small" color="#00ff00" />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: Colors.primaryColor,
    flex: 1,
    flexDirection: "row",
    height: height / 1.5,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Profile;
