import React, { Component } from "react";
import { StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Constants } from "expo";
import { withNavigation } from "react-navigation";

import SideSwipe from "react-native-sideswipe";

import { Card } from "./Card";

const { width, height } = Dimensions.get("window");

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      data: this.props.data
    };
  }

  onPress = id => {
    this.props.navigation.navigate("AnimalH", { id });
  };

  render = () => {
    const offset = (width - Card.WIDTH) / 2;
    const { data } = this.state;

    return (
      <SideSwipe
        data={data}
        shouldRelease={() => true}
        style={[styles.fill, { width, height: height / 1.5 }]}
        contentContainerStyle={{ paddingTop: 100 }}
        itemWidth={Card.WIDTH}
        threshold={Card.WIDTH / 4}
        extractKey={item => item.id.toString()}
        contentOffset={offset}
        onIndexChange={index => this.setState(() => ({ currentIndex: index }))}
        renderItem={({ itemIndex, currentIndex, item, animatedValue }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                this.onPress(item.id);
              }}
            >
              <Card
                animal={item}
                index={itemIndex}
                currentIndex={currentIndex}
                animatedValue={animatedValue}
              />
            </TouchableOpacity>
          );
        }}
      />
    );
  };
}

export default withNavigation(Carousel);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  fill: {
    position: "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});
