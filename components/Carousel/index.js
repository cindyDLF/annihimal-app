import React, { Component } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity
} from "react-native";
import { Constants, Font } from "expo";
import {
  withNavigation,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import SideSwipe from "react-native-sideswipe";

import { Card } from "../Card";

const { width } = Dimensions.get("window");

const animals = [
  { title: "Meerkat", value: "meerkat", abbr: "Some fun fact" },
  { title: "LongNose", value: "longnose", abbr: "Some fun fact" },
  { title: "Maki", value: "maki", abbr: "Some fun fact" },
  { title: "Tiger", value: "tiger", abbr: "Some fun fact" }
];

class Carousel extends Component {
  constructor(prop) {
    super();
    this.state = {
      currentIndex: 0,
      fontsLoaded: false
    };
  }

  componentDidMount = async () => {
    await Font.loadAsync({
      dhurjati: require("../../assets/fonts/Dhurjati-Regular.ttf"),
      "inconsolata-regular": require("../../assets/fonts/Inconsolata-Regular.ttf"),
      "inconsolata-bold": require("../../assets/fonts/Inconsolata-Bold.ttf"),
      "libre-barcode-39": require("../../assets/fonts/LibreBarcode39-Regular.ttf")
    });

    this.setState({ fontsLoaded: true });
  };

  render = () => {
    const offset = (width - Card.WIDTH) / 2;

    return !this.state.fontsLoaded ? (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator color="white" />
      </View>
    ) : (
      <SideSwipe
        data={animals}
        shouldCapture={() => true}
        style={[styles.fill, { width }]}
        contentContainerStyle={{ paddingTop: 100 }}
        itemWidth={Card.WIDTH}
        threshold={Card.WIDTH / 4}
        extractKey={item => item.value}
        contentOffset={offset}
        onIndexChange={index => this.setState(() => ({ currentIndex: index }))}
        renderItem={({ itemIndex, currentIndex, item, animatedValue }) => (
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Animal");
            }}
          >
            <Card
              animal={item}
              index={itemIndex}
              currentIndex={currentIndex}
              animatedValue={animatedValue}
            />
          </TouchableOpacity>
        )}
      />
    );
  };
}

export default withNavigation(Carousel);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "black"
  },
  fill: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});
