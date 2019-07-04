import React from "react";
import { Text, StyleSheet, Dimensions, View } from "react-native";
import Side from "../components/Side";
import Colors from "../constants/Colors";

const { height, width } = Dimensions.get("window");

const Profile = ({ data, title }) => {
  return (
    <View style={styles.container}>
      <Side
        side="right"
        data={{ username: "Test", email: "test@test.te" }}
        title="Profile"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: Colors.primaryColor,
    flex: 1,
    flexDirection: "row",
    height: height / 1.5,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Profile;