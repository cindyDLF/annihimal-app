import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Constants } from "expo";
import SideSwipe from "react-native-sideswipe";

import Carousel from "../components/Carousel";

export default class Home extends Component {
  static navigationOptions = {
    title: "Home"
  };

  render = () => {
    return (
      <View style={styles.container}>
        <Carousel />
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "black"
  }
});