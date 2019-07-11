import React from "react";
import { Text } from "react-native";
import * as Animatable from "react-native-animatable";

import Colors from "../constants/Colors";

const Title = ({
  text,
  color = Colors.blackColor,
  size = 40,
  weight = "bold",
  margin = 20,
  animated = false
}) => {
  if (!animated) {
    return (
      <Text
        style={{
          fontSize: size,
          padding: 5,
          fontFamily: "Avenir",
          fontWeight: weight,
          color,
          margin
        }}
      >
        {text}
      </Text>
    );
  } else {
    return (
      <Animatable.Text
        animation="fadeInDownBig"
        style={{
          fontSize: size,
          padding: 5,
          fontFamily: "Avenir",
          fontWeight: weight,
          color,
          margin
        }}
      >
        {text}
      </Animatable.Text>
    );
  }
};

export default Title;
