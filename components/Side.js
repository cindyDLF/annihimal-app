import React, { Component } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
  Fragment
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Text } from "react-native-elements";
import { Constants, Font } from "expo";
import _ from "lodash";

const { height, width } = Dimensions.get("window");

const Side = ({ side, data }) => {
  image = uri => {
    return (
      <View style={styles.img}>
        <Animatable.Image
          animation={side === "left" ? "bounceInLeft" : "bounceInRight"}
          resizeMode="contain"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
          }}
          source={{
            uri
          }}
        />
      </View>
    );
  };

  text = pres => {
    return (
      <View style={styles.text}>
        {Object.keys(pres).map((key, idx) => {
          return (
            <View
              key={idx}
              style={{
                flex: 1
              }}
            >
              <View>
                <Text h4>{_.startCase(key)}</Text>
                <Text>{pres[key]}</Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  left = data => {
    const { uri, pres } = data;

    return (
      <View style={styles.container}>
        {this.image(uri)}
        {this.text(pres)}
      </View>
    );
  };

  right = data => {
    const { uri, pres } = data;

    return (
      <View style={styles.container}>
        {this.text(pres)}
        {this.image(uri)}
      </View>
    );
  };

  const pres = {
    name: data.name,
    class: data.class,
    scientific_name: data.scientific_name,
    location: data.location
  };

  const display = {
    uri:
      "https://static.vecteezy.com/system/resources/previews/000/300/405/large_2x/orangutan-with-brown-fur-vector.jpg",
    pres
  };

  return side === "right" ? this.right(display) : this.left(display);
};

export default Side;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight
  },
  img: {
    width: width - width / 2.5,
    height: height / 1.5
  },
  text: {
    width: width / 2.5,
    height: height / 1.5,
    padding: 8
  }
});
