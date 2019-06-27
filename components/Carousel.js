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
import {
  withNavigation,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import SideSwipe from "react-native-sideswipe";

import { Card } from "./Card";

const { width } = Dimensions.get("window");

const animals = [
  { title: "Meerkat", value: "meerkat", abbr: "Some fun fact" },
  { title: "LongNose", value: "longnose", abbr: "Some fun fact" },
  { title: "Maki", value: "maki", abbr: "Some fun fact" },
  { title: "Tiger", value: "tiger", abbr: "Some fun fact" }
];

class Carousel extends Component {
  constructor(prop) {
    super();
    this.state = {
      currentIndex: 0
    };
  }

  onPress = () => {
    this.props.navigation.navigate("Animal");
  };

  render = () => {
    const offset = (width - Card.WIDTH) / 2;

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
            <TouchableOpacity onPress={this.onPress}>
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
