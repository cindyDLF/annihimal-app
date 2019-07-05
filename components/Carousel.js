import React, { Component } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity
} from "react-native";
import { Constants, Font } from "expo";
import { withNavigation } from "react-navigation";

import SideSwipe from "react-native-sideswipe";

import { Card } from "./Card";

const { width } = Dimensions.get("window");

const animals = [
  {
    id: 183,
    name: "Robin",
    value: "https://a-z-animals.com/media/animals/images/470x370/robin5.jpg"
  },
  {
    id: 113,
    name: "Umbrellabird",
    value:
      "https://a-z-animals.com/media/animals/images/470x370/umbrellabird_5.jpg"
  },
  {
    id: 134,
    name: "Elephant",

    value:
      "https://a-z-animals.com/media/animals/images/470x370/african_elephant.jpg"
  },
  {
    id: 176,
    name: "Pink Fairy Armadillo",

    value:
      "https://a-z-animals.com/media/animals/images/470x370/pink_fairy_armadillo.jpg"
  }
];

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    };
  }

  onPress = id => {
    this.props.navigation.navigate("Animal", { id });
  };

  render = () => {
    const offset = (width - Card.WIDTH) / 2;
    const { data } = this.state;

    return (
      <SideSwipe
        data={animals}
        shouldRelease={() => true}
        style={[styles.fill, { width }]}
        contentContainerStyle={{ paddingTop: 100 }}
        itemWidth={Card.WIDTH}
        threshold={Card.WIDTH / 4}
        extractKey={item => item.value}
        contentOffset={offset}
        onIndexChange={index => this.setState(() => ({ currentIndex: index }))}
        renderItem={({ itemIndex, currentIndex, item, animatedValue }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                this.onPress(item.id);
              }}
            >
              <Card
                animal={item}
                index={itemIndex}
                currentIndex={currentIndex}
                animatedValue={animatedValue}
              />
            </TouchableOpacity>
          );
        }}
      />
    );
  };
}

export default withNavigation(Carousel);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    paddingTop: Constants.statusBarHeight
  },
  fill: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});
