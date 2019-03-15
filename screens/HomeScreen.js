import React, { Component } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Platform
} from "react-native";
import { Constants, Font } from "expo";
import SideSwipe from "react-native-sideswipe"; // 1.3.0

import { Card } from "../components/Card";

const { width } = Dimensions.get("window");

const planets = [
  { title: "Meerkat", value: "meerkat", abbr: "Some fun fact" },
  { title: "LongNose", value: "longnose", abbr: "Some fun fact" },
  { title: "Maki", value: "maki", abbr: "Some fun fact" },
  { title: "Tiger", value: "tiger", abbr: "Some fun fact" }
];

export default class App extends Component {
  static navigationOptions = {
    title: "Home"
  };

  state = {
    currentIndex: 0,
    fontsLoaded: false
  };

  componentDidMount = async () => {
    await Font.loadAsync({
      dhurjati: require("../assets/fonts/Dhurjati-Regular.ttf"),
      "inconsolata-regular": require("../assets/fonts/Inconsolata-Regular.ttf"),
      "inconsolata-bold": require("../assets/fonts/Inconsolata-Bold.ttf"),
      "libre-barcode-39": require("../assets/fonts/LibreBarcode39-Regular.ttf")
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
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        {/* <Image
          resizeMode="contain"
          style={styles.fill}
          source={require("../assets/images/space-bg.jpg")}
        /> */}
        <SideSwipe
          data={planets}
          shouldCapture={() => true}
          style={[styles.fill, { width }]}
          contentContainerStyle={{ paddingTop: 100 }}
          itemWidth={Card.WIDTH}
          threshold={Card.WIDTH / 4}
          extractKey={item => item.value}
          contentOffset={offset}
          onIndexChange={index =>
            this.setState(() => ({ currentIndex: index }))
          }
          renderItem={({ itemIndex, currentIndex, item, animatedValue }) => (
            <Card
              animal={item}
              index={itemIndex}
              currentIndex={currentIndex}
              animatedValue={animatedValue}
            />
          )}
        />
      </View>
    );
  };
}

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
  },
  title: {
    fontFamily: "dhurjati",
    fontSize: 32,
    color: "white",
    backgroundColor: "transparent",
    textAlign: "center",
    marginTop: 8,
    letterSpacing: 1.6,
    zIndex: 2,
    alignSelf: "center"
  },
  titlePlatformSpecific: Platform.select({
    ios: {
      marginBottom: 10
    }
  })
});
