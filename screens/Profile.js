import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  AsyncStorage,
  ActivityIndicator
} from "react-native";

import { NavigationEvents } from "react-navigation";
import { Constants } from "expo";

import User from "../components/User";
import FlatAnni from "../components/List";
import Title from "../components/Title";
import Colors from "../constants/Colors";

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
      const arrAnimal = await this.getFav(user.jwt, user.user.id);

      this.setState({ data: arrAnimal });
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
    } catch (error) {}
  };

  getFav = async (jwt, id) => {
    try {
      const { data, user, isLoading, trigger } = this.state;
      const { status, res } = await userFavorite(jwt, id);
      return res.animals;
    } catch (err) {
      console.log(err);
    }
    this.setState({ trigger: !trigger });
  };

  render() {
    const { user, isLoading, data } = this.state;
    if (!isLoading) {
      return (
        <View style={styles.container}>
          <NavigationEvents
            onWillFocus={() => this.setState({ trigger: !this.state.trigger })}
          />
          <User data={user} />

          <Title text="Favourites" margin={5} />

          {data ? <FlatAnni data={data} /> : <Text>No favourites 😿</Text>}
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  containerLoad: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Colors.primaryColor
  }
});

export default Profile;
