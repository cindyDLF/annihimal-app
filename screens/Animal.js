import React, { Component } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  AsyncStorage
} from "react-native";
import { List } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import _ from "lodash";

import Colors from "../constants/Colors";

import FavoriteButton from "../components/FavoriteButton";
import Side from "../components/Side";
import StickyHeader from "../components/StickyHeader";

import { getAnimal, addUserFavorite } from "../api/callApi";

class Animal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isConnected: false,
      trigger: false,
      id: props.navigation.state.params,
      animal: {},
      data: [],
      token: "",
      idUser: 0
    };

    this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 100 };
  }

  componentDidUpdate() {
    if (this.state.trigger) {
      this.retrieveData();
    }
  }

  async componentDidMount() {
    const data = await this.getAnimalDetails();
    this.setState({ animal: data.res.animal });
    const details = this.formatAnimal();
    this.setState({ details });
  }

  getAnimalDetails = async () => {
    const { id } = this.state;
    return await getAnimal(id);
  };

  formatAnimal = () => {
    const { animal } = this.state;

    const name = animal.name;
    const scientific_name = animal.scientific_name || "N/A";
    const classification = animal.class.name || "N/A";
    const habitat = animal.habitats > 0 ? animal.habitats[0].name : "N/A";
    const diet = animal.diet.name || "N/A";
    const threat = animal.threats > 0 ? animal.threats[0].name : "N/A";
    const weight = animal.weight || "N/A";
    const lifespan = animal.lifespan || "N/A";
    const group_behaviour =
      animal.group_Behavior !== null ? animal.group_Behavior.name : "N/A";
    const gestation_period = animal.gestation || "N/A";
    const size = animal.size || "N/A";
    const litter = animal.litter_size || "N/A";

    const presentation = {
      title: "Presentation",
      side: "left",
      data: { name, scientific_name, classification }
    };

    const hab = {
      title: "Habitat",
      side: "right",
      data: { habitat, diet, threat }
    };

    const info = {
      title: "Informations",
      side: "left",
      data: { size, weight, lifespan, group_behaviour }
    };

    const repro = {
      title: "Reproduction",
      side: "right",
      data: { gestation_period, litter }
    };

    return [presentation, hab, info, repro];
  };

  retrieveData = () => {
    AsyncStorage.getItem("@annihimal:user").then(res => {
      if (res !== null) {
        const user = JSON.parse(res);
        this.setState({ token: user.jwt });
        this.setState({ idUser: user.user.id });
        this.setState({ isConnected: true });
      } else {
        this.setState({ isConnected: false });
      }
    });
    this.setState({ trigger: !this.state.trigger });
  };

  addFavorite = () => {
    const { token, idUser, id } = this.state;
    console.log(token, idUser, id);
    addUserFavorite(token, idUser, id);
  };

  render() {
    const { isConnected, details, animal, token } = this.state;
    console.log(animal);
    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => this.setState({ trigger: !this.state.trigger })}
        />
        <StickyHeader conservation_status={animal.status} />
        <View style={styles.resultsContainer}>
          <FlatList
            contentContainerStyle={styles.contentContainer}
            data={details}
            keyExtractor={item => item.title}
            removeClippedSubviews="false"
            onViewableItemsChanged={this.handleViewableItemsChanged}
            renderItem={({ item }) => {
              return (
                <Side
                  side={item.side}
                  data={item.data}
                  title={item.title}
                  titleIcon={_.startCase(animal.lifestyle.name)}
                />
              );
            }}
          />
        </View>
        {isConnected ? <FavoriteButton onPress={this.addFavorite} /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryColor,
    flex: 1
  },
  contentContainer: {
    paddingVertical: 20
  },
  resultsContainer: {
    marginBottom: 100
  }
});

export default Animal;
