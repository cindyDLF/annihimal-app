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

import images from "./images";

const Side = ({ side, data, title }) => {
  image = img => {
    return (
      <View style={styles.imgContainer}>
        <Animatable.Image
          animation={side === "left" ? "bounceInLeft" : "bounceInRight"}
          resizeMode="contain"
          style={styles.img}
          source={img}
        />
      </View>
    );
  };

  text = pres => {
    return (
      <View style={styles.text}>
        <Text h4 style={{ textAlign: "center" }}>
          {title}
        </Text>
        {Object.keys(pres).map((key, idx) => {
          return (
            <View
              key={idx}
              style={{
                padding: 8,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {/* <View>{this.getIcon(key, pres[key])}</View> */}
              <View>
                <Image
                  source={images["lifespan"]}
                  style={{ height: 40, width: 40, paddingTop: 16 }}
                />
              </View>
              <Text style={{ textAlign: "center" }}>{_.startCase(key)}</Text>

              <Text style={{ textAlign: "center" }}>{pres[key]}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  left = arg => {
    const { img, data } = arg;

    return (
      <View style={styles.container}>
        {this.image(img)}
        {this.text(data)}
      </View>
    );
  };

  right = arg => {
    const { img, data } = arg;

    return (
      <View style={styles.container}>
        {this.text(data)}
        {this.image(img)}
      </View>
    );
  };

  getIcon = (key, value) => {
    const toHide = [
      "name",
      "scientific_name",
      "classification",
      "group",
      "location",
      "group_behaviour",
      "habitat",
      "diet",
      "threat"
    ];
    if (toHide.indexOf(key) != -1) {
      return;
    }

    return (
      <Image
        source={images[key]}
        style={{ height: 40, width: 40, paddingTop: 16 }}
      />
    );
  };

  getImg = title => {
    switch (title) {
      case "Presentation":
        return images.ourang;

        break;

      case "Habitat":
        return images.forest;

        break;

      case "Reproduction":
        return images.stork;

        break;

      case "Informations":
        return images.diurnal;

        break;
      default:
    }
  };

  const display = {
    img: getImg(title),
    data
  };

  return side === "right" ? this.right(display) : this.left(display);
};

export default Side;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    height: height / 1.7,
    alignItems: "center",
    justifyContent: "center"
  },
  imgContainer: {
    width: width - width / 2.5,
    height: height / 1.5,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    width: width / 2.5,
    height: height / 2,
    padding: 8
  },
  img: {
    height: height / 2.5
  },
  data: {
    padding: 8
  }
});
