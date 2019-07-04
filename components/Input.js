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
      name === "password" || name === "password_confirmation" ? true : false
    }
    onChangeText={text => handleOnChange(name, text)}
  />
);

export default Input;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.secondaryColor,
    width: width - 50,
    padding: 8,
    //borderRadius: 25,
    fontSize: 20,
    marginTop: 30,
    fontFamily: "Avenir",
    color: Colors.whiteColor
  }
});
