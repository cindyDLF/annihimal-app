import React, { Component } from "react";
import { Animated, Dimensions, StyleSheet } from "react-native";

import Colors from "../constants/Colors";

import images from "./images";

const { width: screenWidth } = Dimensions.get("window");
const width = screenWidth - 125;

export class Card extends Component {
  static WIDTH = width;

  render = () => {
    const { animatedValue, animal, index } = this.props;

    return (
      <Animated.View style={styles.container}>
        <Animated.Image
          style={[
            styles.animal,
            {
              transform: [
                {
                  scale: animatedValue.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [1, 1.6, 1],
                    extrapolate: "clamp"
                  })
                },
                {
                  rotate: animatedValue.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: ["-90deg", "0deg", "90deg"],
                    extrapolate: "clamp"
                  })
                }
              ]
            }
          ]}
          source={{
            uri: animal.img
          }}
        />
        {/* <Animated.Text
          style={[
            styles.title,
            {
              opacity: animatedValue.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [0, 1, 0]
              }),
              transform: [
                {
                  translateY: animatedValue.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [-30, 0, -30],
                    extrapolate: "clamp"
                  })
                }
              ]
            }
          ]}
        >
          {animal.name.toUpperCase()}
        </Animated.Text> */}
      </Animated.View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: width,
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible"
  },
  animal: {
    width: width - 25,
    height: width - 25,
    borderRadius: (width - 25) / 2
  },
  title: {
    fontFamily: "Avenir",
    fontSize: 32,
    position: "absolute",
    bottom: 0,
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: 1.2,
    color: Colors.mainColor,
    backgroundColor: "transparent"
  }
});
