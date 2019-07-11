import React from "react";
import { StyleSheet, Dimensions, FlatList, View } from "react-native";
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

  handleEnd = async () => {
    if (this.props.endReached) {
      await this.props.endReached();
    }
  };

  render() {
    const { data } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          windowSize={1}
          initialNumToRender={15}
          removeClippedSubviews="false"
          onEndReached={this.handleEnd}
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
      </View>
    );
  }
}

export default withNavigation(FlatAnni);

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "transparent",
    paddingTop: 25,
    paddingBottom: 10,
    borderColor: "black",

    width: width,
    borderBottomWidth: 1,
    borderColor: Colors.primaryColor,
    marginLeft: 20
    //  borderRadius: 20
  },
  containerTitle: {
    // color: Colors.mainColor,
    color: "#2D344D",
    fontFamily: "Avenir",
    fontWeight: "bold"
  },
  containerFlatList: {
    backgroundColor: Colors.whiteColor,
    paddingTop: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65
  }
});
