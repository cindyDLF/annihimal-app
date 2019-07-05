import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  Dimensions,
  View,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { Constants } from "expo";

import User from "../components/User";
import FlatAnni from "../components/List";
import Title from "../components/Title";

import Colors from "../constants/Colors";
import images from "../components/images";

const { height, width } = Dimensions.get("window");

class Profile extends Component {
  state = {
    user: {},
    isLoading: true,
    data: [
      { id: 1, name: "Maki", img: images.maki },
      { id: 2, name: "Meerkat", img: images.meerkat },
      { id: 3, name: "Tiger", img: images.tiger },
      { id: 4, name: "Longnose", img: images.longnose }
    ]
  };

  componentWillMount() {
    this.retrieveData();
  }

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@annihimal:user");
      if (value !== null) {
        const user = JSON.parse(value);
        this.setState({ user, isLoading: false });
      }
    } catch (error) {}
  };

  render() {
    const { user, isLoading, data } = this.state;
    if (!isLoading) {
      return (
        <View style={styles.container}>
          <User data={user} />

          <Title text="Favourites" margin={5} />

          {data ? <FlatAnni data={data} /> : <Text>No favourites 😿</Text>}
        </View>
      );
    } else {
      return <ActivityIndicator size="small" color={Colors.primaryColor} />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryColor,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Profile;
