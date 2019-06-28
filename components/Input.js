import React from "react";
import { TextInput, StyleSheet, Dimensions } from "react-native";

import Colors from "../constants/Colors";

const width = Dimensions.get("window").width;

const Input = ({ placeholder, value, handleOnChange, name }) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    value={value}
    secureTextEntry={
      name === "password" || name === "password_confirm" ? true : false
    }
    onChangeText={text => handleOnChange(name, text)}
  />
);

export default Input;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.secondaryColor,
    width: width - 50,
    padding: 12,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    fontSize: 20,
    backgroundColor: Colors.secondaryColor,
    marginTop: 30,
    fontFamily: "Avenir"
  }
});
