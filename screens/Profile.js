import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  AsyncStorage,
  ActivityIndicator,
  Dimensions,
  ImageBackground
} from "react-native";

import { NavigationEvents } from "react-navigation";
import { Constants } from "expo";

import User from "../components/User";
import FlatAnni from "../components/List";
import Title from "../components/Title";
import Colors from "../constants/Colors";

const height = Dimensions.get("window").height;

import { userFavorite } from "../api/callApi";

class Profile extends Component {
  state = {
    user: {},
    isLoading: true,
    data: [],
    trigger: false
  };

  componentWillMount() {
    this.retrieveData();
  }

  async componentDidUpdate(prevProps, prevState) {
    const { data, user } = this.state;
    if (this.state.trigger) {
      await this.retrieveData();
    }
  }

  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("@annihimal:user");
      if (value !== null) {
        const user = JSON.parse(value);
        const arrAnimals = await this.getFav(user.jwt, user.user.id);
        this.setState({ data: arrAnimals });
        this.setState({ user, isLoading: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  getFav = async (jwt, id) => {
    try {
      const { data, user, isLoading, trigger } = this.state;
      const { status, res } = await userFavorite(jwt, id);

      this.setState({ trigger: !trigger });
      return res.animals;
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { user, isLoading, data } = this.state;
    if (!isLoading) {
      return (
        <View style={styles.container}>
          <ImageBackground
            source={require("../assets/images/background.png")}
            style={{ width: "100%", height: "100%" }}
          >
            <NavigationEvents
              onWillFocus={() =>
                this.setState({ trigger: !this.state.trigger })
              }
            />
            <User data={user} />

            <Title text="favourites" margin={5} />
            <View style={styles.containerFlatList}>
              {data ? <FlatAnni data={data} /> : <Text>No favourites 😿</Text>}
            </View>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View style={styles.containerLoad}>
          <ActivityIndicator size="large" color="black" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryColor,
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  containerLoad: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Colors.primaryColor
  },
  containerFlatList: {
    backgroundColor: Colors.whiteColor,
    paddingTop: 20,
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65
  }
});

export default Profile;
