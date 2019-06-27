import React from "react";
import { Text, StyleSheet } from "react-native";

const Title = ({ text, color, size, weight, margin }) => {
  setStyle = (color, size) => {
    color = color || "#C3CC6A";
    size = size || 40;
    weight = weight || "bold";
    margin = margin || 20;
    return {
      fontSize: size,
      padding: 5,
      fontFamily: "Avenir",
      fontWeight: weight,
      color: color,
      margin: margin
    };
  };
  return <Text style={setStyle(color, size)}>{text}</Text>;
};

export default Title;
