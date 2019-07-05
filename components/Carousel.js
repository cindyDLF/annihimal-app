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
    id: 9,
    name: "Javan Rhinoceros",
    value:
      "https://a-z-animals.com/media/animals/images/470x370/javan_rhinoceros.jpg"
  },
  {
    id: 13,
    name: "Red Wolf",
    value: "https://a-z-animals.com/media/animals/images/470x370/red_wolf2.jpg"
  },
  {
    id: 14,
    name: "Saola",
    value: "https://a-z-animals.com/media/animals/images/470x370/saola.png"
  },
  {
    id: 12,
    name: "Radiated Tortoise",
    value:
      "https://a-z-animals.com/media/animals/images/470x370/radiated_tortoise1.jpg"
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
    this.props.navigation.navigate("Animal", id);
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
