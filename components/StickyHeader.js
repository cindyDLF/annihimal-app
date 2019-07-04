import React from "react";
import { Text, StyleSheet, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const height = "13.5%";

const StickyHeader = ({ conservation_status }) => {
  const setBackground = background => {
    return {
      backgroundColor: background,
      height,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5
      },
      shadowOpacity: 0.05,
      shadowRadius: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 16
    };
  };

  const setColor = color => {
    return {
      fontSize: 20,
      paddingLeft: 10,
      fontFamily: "Avenir",
      color: color
    };
  };

  let data = {};
  switch (conservation_status) {
    case "Extinct":
      data = { name: "skull-crossbones", background: "#000", color: "#fff" };
      break;
    case "Critically Endangered":
      data = {
        name: "exclamation-triangle",
        background: "#F50000",
        color: "#000"
      };
      break;
    case "Endangered":
      data = {
        name: "exclamation-triangle",
        background: "#F50000",
        color: "#000"
      };
      break;
    case "Vulnerable":
      data = {
        name: "exclamation-triangle",
        background: "#FD6200",
        color: "#000"
      };
      break;
    case "Threatened":
      data = {
        name: "exclamation-triangle",
        background: "#FD6200",
        color: "#000"
      };
      break;
    case "Near Threatened":
      data = {
        name: "exclamation-triangle",
        background: "#F8D104",
        color: "#000"
      };
      break;
  }

  return (
    <View style={setBackground(data.background)}>
      <View style={styles.content}>
        <FontAwesome5
          name={data.name}
          color={data.color}
          size={26}
          style={{ marginBottom: -3 }}
        />
        <Text style={setColor(data.color)}>{conservation_status}</Text>
      </View>
    </View>
  );
};

export default StickyHeader;

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    fontSize: 20,
    paddingLeft: 10,
    fontFamily: "Avenir"
  }
});
