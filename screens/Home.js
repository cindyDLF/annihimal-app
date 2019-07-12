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

const infoNew = [
  {
    title: "Pygmy 3-toed sloth",
    new: "Destruction of Panama Mangrove’s threatens the sloths existence."
  },
  {
    title: "Greater Bamboo Lemur",
    new:
      "Once populous in Madagascar, the natural habitat for these slow moving creatures is disappearing. There are no supporting habitats to take its place."
  },
  {
    title: "Bazzania Bhutanica",
    new:
      "A type of Liverwort plant, it is all but extinct due to human interference and destruction of the dry, tropical rainforest areas that it prefers."
  },
  {
    title: "Santa Catarina’s Guinea Pig",
    new:
      "Found only on a small island off Brazil, this population of guinea pigs is diminishing through poaching and land development."
  },
  {
    title: "Discoglossus Nigriventer",
    new:
      "This painted frog lives in the Israeli region and was once declared extinct, before a few survivors were spotted."
  }
];
export default class Home extends Component {
  static navigationOptions = {
    title: "Home"
  };

  state = {
    data: [],
    isLoading: true,
    animation: "fadeInUpBig",
    idx: 0
  };

  async componentDidMount() {
    const { idx } = this.state;
    const data = await this.getRandomAnimal(5);
    this.setState({ data: data.res.animals, isLoading: false });
    let index = idx;

    this._interval = setInterval(() => {
      if (index === infoNew.length - 1) {
        index = 0;
      } else {
        index++;
      }
      this.setState({ idx: index });
    }, 12000);
  }

  getRandomAnimal = async nb => {
    return await getCarousel(nb);
  };

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
              duration={5000}
              iterationDelay={1000}
            >
              <View style={styles.containerTitle}>
                <Text style={styles.textTitle}>{infoNew[idx].title}</Text>
              </View>

              <Text style={styles.textInfo}>{infoNew[idx].new}</Text>
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
    backgroundColor: Colors.primaryColor
  },
  containerList: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start"
  },
  containerLoad: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    marginLeft: "auto",
    marginRight: "auto"
  },
  textInfo: {
    fontFamily: "Avenir",
    color: Colors.blackColor,
    fontSize: 18
  },
  containerTitle: {
    backgroundColor: Colors.secondaryColor,
    marginBottom: 5,
    borderRadius: 5,
    padding: 5
  },
  textTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.whiteColor
  }
});
