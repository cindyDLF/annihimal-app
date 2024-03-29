import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  AsyncStorage,
  ActivityIndicator,
  ImageBackground
} from "react-native";
import Toast, { DURATION } from "react-native-easy-toast";
import { NavigationEvents } from "react-navigation";
import { Constants } from "expo";
import _ from "lodash";
import { getUserAsync } from "../storageRepo";

import Colors from "../constants/Colors";

import FavoriteButton from "../components/FavoriteButton";
import Side from "../components/Side";
import StickyHeader from "../components/StickyHeader";

import {
  getAnimal,
  addUserFavorite,
  removeUserFavorite,
  userFavorite
} from "../api/callApi";

class Animal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isConnected: false,
      trigger: false,
      id: props.navigation.state.params.id,
      animal: {},
      data: [],
      isLoading: true,
      token: "",
      idUser: 0,
      favorites: [],
      isFavoriteUser: false,
      trigger: false
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
      await this.retrieveData();
      this.setState({ trigger: false });
    }

    if (this.state.id != prevProps.navigation.state.params.id) {
      const data = await this.getAnimalDetails();
      this.setState({ animal: data.res.animal });
      const details = this.formatAnimal();
      this.setState({ details });
    }
  }

  async componentDidMount() {
    this.retrieveData();
    const data = await this.getAnimalDetails();
    this.setState({ animal: data.res.animal });
    const details = this.formatAnimal();
    this.setState({ details, isLoading: false });
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
    const habitat =
      animal.habitats.length > 0 ? animal.habitats[0].name : "N/A";
    const diet = animal.diet.name || "N/A";
    const threat = animal.threats.length > 0 ? animal.threats[0].name : "N/A";
    const weight = animal.weight || "N/A";
    const lifespan = animal.lifespan || "N/A";
    const group_behaviour =
      animal.group_Behavior !== null ? animal.group_Behavior.name : "N/A";
    const gestation_period = animal.gestation || "N/A";
    const size = animal.size || "N/A";
    const litter = animal.litter_size || "N/A";
    const img = animal.img;
    const lifestyle = animal.lifestyle.name || "Unknown";

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
      data: { size, weight, lifespan, group_behaviour },
      lifestyle
    };

    const repro = {
      title: "reproduction",
      side: "right",
      data: { gestation_period, litter }
    };

    return [presentation, hab, info, repro];
  };

  retrieveData = async () => {
    AsyncStorage.getItem("@annihimal:user").then(async res => {
      if (res !== null) {
        const user = JSON.parse(res);

        this.setState({ isConnected: true });
        const arrAnimals = await this.getFav(user.jwt, user.user.id);
        this.setState({ favorites: arrAnimals });
        this.checkFav();
      } else {
        this.setState({ isConnected: false });
      }
    });
  };

  getFav = async (jwt, id) => {
    try {
      const { res } = await userFavorite(jwt, id);
      return res.animals;
    } catch (err) {
      console.log(err);
    }
  };

  checkFav = () => {
    const { favorites, id } = this.state;

    favorites.forEach(item => {
      if (item.id === id) {
        this.setState({ isFavoriteUser: true });
      }
    });
  };

  addFavorite = async () => {
    const {
      jwt,
      user: { id: idUser }
    } = await getUserAsync();
    const { id } = this.state;
    addUserFavorite(jwt, idUser, id);
    this.setState({ isFavoriteUser: true });
  };

  removeFavorite = async () => {
    const {
      jwt,
      user: { id: idUser }
    } = await getUserAsync();
    const { id } = this.state;
    removeUserFavorite(jwt, idUser, id);
    this.setState({ isFavoriteUser: false });
  };

  render() {
    const {
      isConnected,
      details,
      animal,
      isLoading,
      isFavoriteUser
    } = this.state;
    if (!isLoading) {
      return (
        <View style={styles.container}>
          <ImageBackground
            source={require("../assets/images/background.png")}
            style={{ width: "100%", height: "100%" }}
          >
            <NavigationEvents
              onWillFocus={() =>
                this.setState({ trigger: !this.state.trigger })
              }
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
                      lifestyle={item.lifestyle}
                    />
                  );
                }}
              />
            </View>

            <FavoriteButton
              isFavorite={isFavoriteUser}
              onPress={() => {
                if (isConnected) {
                  !isFavoriteUser ? this.addFavorite() : this.removeFavorite();
                } else {
                  this.refs.toast.show(
                    "You must be connected to add favourites!",
                    DURATION.LENGTH_LONG
                  );
                }
              }}
            />
            <Toast
              ref="toast"
              style={{ backgroundColor: "black" }}
              position="bottom"
              positionValue={250}
              fadeInDuration={3000}
              fadeOutDuration={1000}
              opacity={0.9}
              textStyle={{ color: "white" }}
            />
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
    flex: 1
  },
  contentContainer: {
    paddingVertical: 20
  },
  containerLoad: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryColor
  }
});

export default Animal;
