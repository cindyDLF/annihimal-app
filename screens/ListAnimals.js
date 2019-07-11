import React from "react";
import { StyleSheet, View, Dimensions, ActivityIndicator } from "react-native";
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
          <Title text="animals" />
          <ListAnni data={data} endReached={this.endReached} />
        </View>
      );
    } else {
      return <ActivityIndicator size="small" color={Colors.primaryColor} />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: Colors.primaryColor,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
  }
});

export default ListAnimal;
