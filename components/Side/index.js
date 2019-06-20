import React, { Component } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Dimensions,
  Platform,
  Image,
  Fragment
} from "react-native";
import { Text } from "react-native-elements";
import { Constants, Font } from "expo";
import _ from "lodash";

const { height, width } = Dimensions.get("window");

export default class Side extends Component {
  state = {
    animal: {
      name: "Bornean Orang-utan",
      img:
        "https://a-z-animals.com/media/animals/images/470x370/bornean_orang-utan1.jpg",
      kingdom: "Animalia",
      phylum: "Chordata",
      class: "Mammalia",
      order: "Primates",
      family: "Hominidae",
      genus: "Pongo",
      scientific_name: "Pongo pygmaeus",
      common_name: "Bornean Orang-utan",
      "other_name(s)": "Red Ape, Forest People",
      group: "Mammal",
      "number_of species": "3",
      location: "Borneo",
      habitat: "Lowland forest and peat-swamps",
      colour: "Red, Orange, Brown, Grey, Black",
      skin_type: "Hair",
      "size_(h)": "1.25m - 1.5m (4ft - 5ft)",
      weight: "30kg - 90kg (66lbs - 200lbs)",
      top_speed: "6kph (2.7mph)",
      diet: "Omnivore",
      prey: "Fruits, Bark, Insects",
      predators: "Human, Tiger, Clouded Leopard",
      lifestyle: "Diurnal",
      group_behaviour: "Solitary",
      lifespan: "30 - 40 years",
      "age_of sexual maturity": "12 - 15 years",
      gestation_period: "9 months",
      "average_litter size": "1",
      "name_of young": "Infant",
      "age_of weaning": "3 years",
      conservation_status: "Critically Endangered",
      "estimated_population size": "13,500",
      biggest_threat: "Habitat loss",
      "most_distinctive feature": "Highly intelligent with very long arms",
      fun_fact: "Known to use large leaves as umbrellas!"
    }
  };

  render = () => {
    const { animal } = this.state;
    const pres = {
      name: animal.name,
      class: animal.class,
      scientific_name: animal.scientific_name,
      location: animal.location
    };
    console.log(pres);
    return (
      <View style={styles.container}>
        <View
          style={{
            width: width - width / 2.5,
            height: height / 1.5
          }}
        >
          <Image
            resizeMode="contain"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0
            }}
            source={{
              uri:
                "https://static.vecteezy.com/system/resources/previews/000/300/405/large_2x/orangutan-with-brown-fur-vector.jpg"
            }}
          />
        </View>

        <View
          style={{
            width: width / 2.5,
            height: height / 1.5
          }}
        >
          {Object.keys(pres).map((key, idx) => {
            return (
              <View key={idx}>
                <Text h4>{_.startCase(key)}</Text>
                <Text>{pres[key]}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight
  }
});
