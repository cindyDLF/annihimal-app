import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Constants } from "expo";
import SideSwipe from "react-native-sideswipe";

import Carousel from "../components/Carousel";
import Title from "../components/Title";

import { getCarousel } from "../api/callApi";

import Colors from "../constants/Colors";

export default class Home extends Component {
  static navigationOptions = {
    title: "Home"
  };

  state = { data: [], isLoading: true };

  async componentDidMount() {
    const data = await this.getRandomAnimal(5);
    this.setState({ data: data.res.animals, isLoading: false });
  }

  getRandomAnimal = async nb => {
    return await getCarousel(nb);
  };

  render = () => {
    const { data, isLoading } = this.state;
    if (!isLoading) {
      return (
        <View style={styles.container}>
          <View style={styles.center}>
            <Title text="annihimal" size={60} />
          </View>
          <View style={styles.container}>
            <Carousel data={data} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="small" color={Colors.primaryColor} />
        </View>
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Colors.primaryColor
  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  }
});
