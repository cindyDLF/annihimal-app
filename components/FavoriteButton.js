import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const FavoriteButton = ({ isFavorite, onPress }) => {
  return (
    <TouchableOpacity style={styles.actionButtonIcon} onPress={() => onPress()}>
      {isFavorite ? (
        <Icon name="md-heart" size={25} color="#fff" />
      ) : (
        <Icon name="md-heart-empty" size={25} color="#fff" />
      )}
    </TouchableOpacity>
  );
};

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
    backgroundColor: "#E22735",
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
