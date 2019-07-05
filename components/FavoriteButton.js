import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const FavoriteButton = ({ isFavorite }) => (
  <View style={styles.actionButtonIcon}>
    {isFavorite ? (
      <Icon name="md-heart" size={25} />
    ) : (
      <Icon name="md-heart-empty" size={25} />
    )}
  </View>
);

export default FavoriteButton;

const styles = StyleSheet.create({
  actionButtonIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    position: "absolute",
    bottom: 20,
    right: 10,
    height: 70,
    backgroundColor: "#C3CC6A",
    borderRadius: 100,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.05,
    shadowRadius: 1
  }
});
