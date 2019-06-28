import React from "react";
import { Text, StyleSheet } from "react-native";

const Title = ({
  text,
  color = "#C3CC6A",
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
