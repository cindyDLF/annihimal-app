import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import { Constants } from "expo";

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
          <ImageBackground
            source={require("../assets/images/background.png")}
            style={{ width: "100%", height: "100%" }}
          >
            <View style={styles.center}>
              <Title text="annihimal" size={60} animated={true} />
            </View>
            <View style={styles.containerList}>
              <Carousel data={data} />
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
  containerList: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    paddingTop: Constants.statusBarHeight
  },
  containerLoad: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Colors.primaryColor
  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  }
});
