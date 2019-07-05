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

import { userFavorite } from "../api/callApi";

const { height, width } = Dimensions.get("window");

class Profile extends Component {
  state = {
    user: {},
    isLoading: true,
    data: []
  };

  componentWillMount() {
    this.retrieveData();
  }

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@annihimal:user");
      if (value !== null) {
        const user = JSON.parse(value);
        console.log(user.jwt, user.user.id);
        this.getFav(user.jwt, user.user.id);

        this.setState({ user, isLoading: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  getFav = async (jwt, id) => {
    try {
      const { data, user, isLoading } = this.state;
      const { status, res } = await userFavorite(jwt, id);
      console.log("STATUS:::", status);
      //console.log("RES:::", res);
      //this.setState({ data: res });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { user, isLoading, data } = this.state;
    console.log(user);
    console.log(data);
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
