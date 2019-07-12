import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import { Text } from "react-native-elements";

import Title from "./Title";
import _ from "lodash";

const { height, width } = Dimensions.get("window");

import images from "./images";

const Side = ({ side, data, title, img, lifestyle }) => {
  image = img => {
    return (
      <View style={styles.imgContainer}>
        <Animatable.Image
          animation={side === "left" ? "bounceInLeft" : "bounceInRight"}
          resizeMode="contain"
          duration={3500}
          style={styles.img}
          source={img}
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
                padding: 8,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <View>{this.getIcon(key, pres[key])}</View>

              <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                {_.startCase(key)}
              </Text>

              <Text style={{ textAlign: "center" }}>
                {_.capitalize(pres[key])}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  left = arg => {
    const { img, data } = arg;

    return (
      <View style={{ marginBottom: 30 }}>
        <Title text={title} size={30} color="black" margin={1} />

        <View style={styles.container}>
          {this.image(img)}
          {this.text(data)}
        </View>
      </View>
    );
  };

  right = arg => {
    const { img, data } = arg;

    return (
      <View style={{ marginBottom: 30 }}>
        <Title text={title} size={30} color="black" margin={1} />
        <View style={styles.container}>
          {this.text(data)}
          {this.image(img)}
        </View>
      </View>
    );
  };

  getIcon = (key, value) => {
    const toHide = ["name", "scientific_name", "classification", "group"];
    if (toHide.indexOf(key) != -1) {
      key = "data";
    }

    if (value == "N/A") {
      key = "unknown";
    }

    if (key == "diet" || key == "group_behaviour") {
      key = value;
    }

    key = key.toLowerCase();

    return (
      <Image
        source={images[key]}
        style={{ height: 40, width: 40, paddingTop: 16 }}
      />
    );
  };

  getImg = title => {
    switch (title) {
      case "presentation":
        return {
          uri: img
        };

        break;

      case "habitat":
        return images.forest;

        break;

      case "reproduction":
        return images.stork;

        break;

      case "informations":
        return images.diurnal;

        break;

      default:
    }
  };

  getLifestyle = lifestyle => {
    if (lifestyle !== "Unknown") {
      if (lifestyle === "Diurnal") {
        return images.diurnal;
      }

      if (lifestyle === "Nocturnal") {
        return images.nocturnal;
      }

      if (lifestyle === "Solitary") {
        return images.solitary;
      }

      return images.herd;
    } else {
      return images.unknown;
    }
  };

  const display = {
    img: lifestyle ? getLifestyle(lifestyle) : getImg(title),
    data
  };

  return side === "right" ? this.right(display) : this.left(display);
};

export default Side;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  imgContainer: {
    width: width - width / 2.5,
    height: height / 1.8,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    width: width / 2.5,
    height: height / 2,
    padding: 8
  },
  img: {
    height: 300,
    width: 300,
    borderRadius: 60
  },
  data: {
    padding: 8
  }
});
