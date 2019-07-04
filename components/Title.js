import React from "react";
import { Text, StyleSheet } from "react-native";

import Colors from "../constants/Colors";

const Title = ({
  text,
  color = Colors.blackColor,
  size = 40,
  weight = "bold",
  margin = 20
}) => {
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
};

export default Title;
