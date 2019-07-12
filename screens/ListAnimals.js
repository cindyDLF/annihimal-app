import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import { Constants } from "expo";

import Colors from "../constants/Colors";
import Title from "../components/Title";
import ListAnni from "../components/List";

import { getAnimalList } from "../api/callApi";

const width = Dimensions.get("window").width;

class ListAnimal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      nb: 0
    };
  }

  async componentDidMount() {
    const data = await getAnimalList(0);
    this.setState({ data: data.res.animals, isLoading: false });
  }

  endReached = async () => {
    const { nb, data } = this.state;
    newNb = nb + 10;
    const {
      res: { animals }
    } = await getAnimalList(newNb);
    const newData = [...data, ...animals];
    await this.setState({ data: newData, nb: newNb });
  };

  render() {
    const { data, isLoading } = this.state;

    if (!isLoading) {
      return (
        <View style={styles.container}>
          <ImageBackground
            source={require("../assets/images/background.png")}
            style={{ width: "100%", height: "100%" }}
          >
            <Title text="animals" animated={true} />
            <View style={styles.containerFlatList}>
              <ListAnni data={data} endReached={this.endReached} />
            </View>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View style={styles.containerLoad}>
          <ActivityIndicator size="large" color="black" />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryColor,
    flex: 1,
    alignItems: "center"
  },
  containerLoad: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryColor
  },
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

export default ListAnimal;
