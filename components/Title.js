import React from "react";
import { Text, StyleSheet } from "react-native";

const Title = ({ text, color, size, weight }) => {
  setStyle = (color, size) => {
    color = color || "#C3CC6A";
    size = size || 40;
    weight = weight || "bold";
    return {
      fontSize: size,
      padding: 5,
      fontFamily: "Avenir",
      fontWeight: weight,
      color: color,
      margin: 20
    };
  };
  return <Text style={setStyle(color, size)}>{text}</Text>;
};

export default Title;
