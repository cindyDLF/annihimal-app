import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import ActionButton from "react-native-action-button";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

class FavoriteButton extends Component {
  render() {
    return (
      <ActionButton
        buttonColor="rgba(231,76,60,1)"
        renderIcon={active =>
          active ? (
            <Icon name="md-heart" style={styles.actionButtonIcon} />
          ) : (
            <Icon name="md-heart-empty" style={styles.actionButtonIcon} />
          )
        }
        degrees={0}
        onPress={() => this.props.onPress()}
        backgroundTappable={true}
      >
        [your other action button items]
      </ActionButton>
    );
  }
}

export default FavoriteButton;

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});
