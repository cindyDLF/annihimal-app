import React from "react";
import { Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Colors from "../constants/Colors";
const width = Dimensions.get("window").width;

const Button = ({ text, onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

export default Button;

const styles = StyleSheet.create({
  text: {
    fontSize: 26,
    fontFamily: "Avenir",
    fontWeight: "bold",
    color: Colors.mainColor
  },
  button: {
    backgroundColor: Colors.whiteColor,
    alignItems: "center",
    width: width - 50,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    padding: 8,
    margin: 30
  }
});
