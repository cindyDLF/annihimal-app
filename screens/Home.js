import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  Text,
  Dimensions
} from "react-native";
import { Constants } from "expo";

import Carousel from "../components/Carousel";
import Title from "../components/Title";
import * as Animatable from "react-native-animatable";

import { getCarousel } from "../api/callApi";

import Colors from "../constants/Colors";

const width = Dimensions.get("window").width;

const info = [
  { id: 1, new: "ce matin un lapin a tué un chasseur" },
  {
    id: 2,
    new: "la chèvre de monsieur Seguin s'est encore fait manger par le loup"
  },
  { id: 3, new: "trois petits sont entrés dans ma cuisine blablabla" }
];
const infoNew = [
  "ce matin un lapin a tué un chasseur",
  "la chèvre de monsieur Seguin s'est encore fait manger par le loup",
  "trois petits sont entrés dans ma cuisine blablabla"
];
export default class Home extends Component {
  static navigationOptions = {
    title: "Home"
  };

  state = {
    data: [],
    isLoading: true,
    animation: "fadeInUpBig",
    info: info[0],
    idx: 0
  };

  async componentDidMount() {
    const { idx } = this.state;
    const data = await this.getRandomAnimal(5);
    this.setState({ data: data.res.animals, isLoading: false });
    let index = idx;

    this._interval = setInterval(() => {
      let compare;
      console.log(infoNew.length, index);
      if (index === infoNew.length - 1) {
        index = 0;
        console.log("Tamère", index);
      } else {
        index++;
        console.log("tonpère: ", index);
      }
      this.setState({ idx: index });
    }, 8000);
  }

  getRandomAnimal = async nb => {
    return await getCarousel(nb);
  };

  displayNew() {
    return info.map(item => {
      console.log(item);
      return (
        <Animatable.View animation="bounceInRight" key={item.id}>
          <Text>{item.new}</Text>
        </Animatable.View>
      );
    });
    return map;
  }
  render = () => {
    const { data, isLoading, animation, idx } = this.state;
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
            <Animatable.View
              style={styles.containerInfo}
              animation={animation}
              iterationCount="infinite"
              direction="alternate"
              duration={3000}
              iterationDelay={1000}
            >
              <Text style={styles.textInfo}>{infoNew[idx]}</Text>
            </Animatable.View>
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
  },
  containerInfo: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    backgroundColor: Colors.whiteColor,
    padding: 10,
    width: width - 80,
    marginBottom: 50,
    borderRadius: 10,
    marginLeft: 10
  },
  textInfo: {
    fontFamily: "Avenir"
  }
});
