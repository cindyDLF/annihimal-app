import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  AsyncStorage
} from "react-native";
import { NavigationEvents } from "react-navigation";
import _ from "lodash";

import Colors from "../constants/Colors";

import FavoriteButton from "../components/FavoriteButton";
import Side from "../components/Side";
import StickyHeader from "../components/StickyHeader";

import { getAnimal } from "../api/callApi";

class Animal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isConnected: false,
      trigger: false,
      id: props.navigation.state.params.id,
      animal: {},
      data: []
    };

    this.viewabilityConfig = { viewAreaCoveragePercentThreshold: 100 };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.navigation.state.params.id !== state.id) {
      return { id: props.navigation.state.params.id };
    } else {
      return null;
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.trigger) {
      this.retrieveData();
    }

    if (this.state.id != prevProps.navigation.state.params.id) {
      const data = await this.getAnimalDetails();
      this.setState({ animal: data.res.animal });
      const details = this.formatAnimal();
      this.setState({ details });
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
    const img = animal.img;

    const presentation = {
      title: "presentation",
      side: "left",
      data: { name, scientific_name, classification },
      img
    };

    const hab = {
      title: "habitat",
      side: "right",
      data: { habitat, diet, threat }
    };

    const info = {
      title: "informations",
      side: "left",
      data: { size, weight, lifespan, group_behaviour }
    };

    const repro = {
      title: "reproduction",
      side: "right",
      data: { gestation_period, litter }
    };

    return [presentation, hab, info, repro];
  };

  retrieveData = () => {
    AsyncStorage.getItem("@annihimal:user").then(res => {
      if (res !== null) {
        this.setState({ isConnected: true });
      } else {
        this.setState({ isConnected: false });
      }
    });
    this.setState({ trigger: !this.state.trigger });
  };

  render() {
    const { isConnected, details, animal } = this.state;

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillFocus={() => this.setState({ trigger: !this.state.trigger })}
        />
        <StickyHeader conservation_status={animal.status} />
        <View>
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
                  img={item.img}
                />
              );
            }}
          />
        </View>
        {isConnected ? <FavoriteButton /> : null}
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
  }
});

export default Animal;
