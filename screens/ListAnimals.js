import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Constants } from "expo";
import { ListItem, Text } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";

import images from "../components/images";

const data = [
  { id: 1, name: "Maki", img: images.maki },
  { id: 2, name: "Meerkat", img: images.meerkat },
  { id: 3, name: "Tiger", img: images.tiger },
  { id: 4, name: "Longnose", img: images.longnose },
  { id: 5, name: "Maki", img: images.maki },
  { id: 6, name: "Meerkat", img: images.meerkat },
  { id: 7, name: "Tiger", img: images.tiger },
  { id: 8, name: "Longnose", img: images.longnose },
  { id: 9, name: "Maki", img: images.maki },
  { id: 10, name: "Meerkat", img: images.meerkat },
  { id: 11, name: "Tiger", img: images.tiger },
  { id: 12, name: "Longnose", img: images.longnose },
  { id: 13, name: "Maki", img: images.maki },
  { id: 14, name: "Meerkat", img: images.meerkat },
  { id: 15, name: "Tiger", img: images.tiger },
  { id: 16, name: "Longnose", img: images.longnose },
  { id: 17, name: "Maki", img: images.maki },
  { id: 18, name: "Meerkat", img: images.meerkat },
  { id: 19, name: "Tiger", img: images.tiger },
  { id: 20, name: "Longnose", img: images.longnose }
];

const ListAnimal = () => {
  return (
    <View style={styles.container}>
      <Text h4 style={{ marginBottom: 16 }}>
        Animal List
      </Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        windowSize={1}
        initialNumToRender={1}
        removeClippedSubviews="true"
        viewabilityConfig={{
          waitForInteraction: true,
          viewAreaCoveragePercentThreshold: 100
        }}
        renderItem={({ item }) => {
          return (
            <ListItem
              friction={90}
              tension={100}
              activeScale={0.95}
              Component={TouchableScale}
              containerStyle={styles.containerStyle}
              titleStyle={styles.containerTitle}
              title={item.name}
              leftAvatar={{ source: item.img }}
              onPress={() => {
                console.log("TODO::: navigate to animal page + send data");
              }}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#6F9B45",
    flex: 1
  },
  containerStyle: {
    backgroundColor: "#c4f0c5",
    borderRadius: 30,
    marginBottom: 8,
    marginRight: 8,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: "black",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27
  },
  containerTitle: {
    color: "#6F9B45",
    fontFamily: "Avenir",
    fontWeight: "bold"
  }
});

export default ListAnimal;
