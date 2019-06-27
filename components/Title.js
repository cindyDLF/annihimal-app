import React from "react";
import { Text, StyleSheet } from "react-native";

const Title = ({ text }) => <Text style={styles.text}>{text}</Text>;

export default Title;

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    padding: 5,
    fontFamily: "Avenir",
    fontWeight: "bold",
    color: "#C3CC6A",
    margin: 20
  }
});
