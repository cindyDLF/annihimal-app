import React from "react";
import { StyleSheet, Dimensions, FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { withNavigation } from "react-navigation";
import TouchableScale from "react-native-touchable-scale";

import Colors from "../constants/Colors";

const width = Dimensions.get("window").width;

class FlatAnni extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };

    this.viewabilityConfig = {
      waitForInteraction: true,
      viewAreaCoveragePercentThreshold: 100
    };
  }

  render() {
    const { data } = this.state;
    return (
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        windowSize={1}
        initialNumToRender={1}
        removeClippedSubviews="false"
        viewabilityConfig={this.viewabilityConfig}
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
              leftAvatar={{ source: { uri: item.img } }}
              onPress={() => {
                this.props.navigation.navigate("Animal", { id: item.id });
              }}
            />
          );
        }}
      />
    );
  }
}

export default withNavigation(FlatAnni);

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: Colors.whiteColor,
    marginBottom: 10,
    padding: 16,
    borderColor: "black",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    width: width - 10,
    borderRadius: 20
  },
  containerTitle: {
    color: Colors.mainColor,
    fontFamily: "Avenir",
    fontWeight: "bold"
  }
});
