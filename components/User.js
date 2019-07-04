import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import { Avatar, Text } from "react-native-elements";
import _ from "lodash";

import Colors from "../constants/Colors";
import images from "./images";

const { height, width } = Dimensions.get("window");

const User = ({ data }) => {
  const { email, username } = data.user;

  return (
    <View style={styles.container}>
      <Avatar size="xlarge" source={images["user"]} rounded />
      <Text h4>{username}</Text>
      <Text>{email}</Text>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    padding: 8,
    width: width - 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.05,
    shadowRadius: 1
  }
});
