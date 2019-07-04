import React from "react";
import { ScrollView, View, StyleSheet, FlatList } from "react-native";
import { List } from "react-native-elements";

import Colors from "../constants/Colors";

import FavoriteButton from "../components/FavoriteButton";
import Side from "../components/Side";
import StickyHeader from "../components/StickyHeader";

const Animal = () => {
  const animal = {
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
    conservation_status: "Extinct",
    //  conservation_status: "Critically Endangered",
    "estimated_population size": "13,500",
    biggest_threat: "Habitat loss",
    "most_distinctive feature": "Highly intelligent with very long arms",
    fun_fact: "Known to use large leaves as umbrellas!"
  };

  const {
    name,
    scientific_name,
    group,
    class: classification,
    location,
    habitat,
    diet,
    biggest_threat,
    weight,
    lifespan,
    group_behaviour,
    gestation_period
  } = animal;

  const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max)).toString();
  };
  const presentation = {
    title: "Presentation",
    side: "left",
    data: { name, scientific_name, classification, group }
  };
  const hab = {
    title: "Habitat",
    side: "right",
    data: { location, habitat, diet, threat: biggest_threat }
  };
  const info = {
    title: "Informations",
    side: "left",
    data: { size: animal["size_(h)"], weight, lifespan, group_behaviour }
  };
  const repro = {
    title: "Reproduction",
    side: "right",
    data: { gestation_period, litter: animal["average_litter size"] }
  };
  const data = [presentation, hab, info, repro];

  return (
    <View style={styles.container}>
      <StickyHeader conservation_status={animal.conservation_status} />
      <View style={styles.resultsContainer}>
        <FlatList
          contentContainerStyle={styles.contentContainer}
          data={data}
          keyExtractor={item => item.title}
          //windowSize={1}
          initialNumToRender={1}
          removeClippedSubviews="true"
          viewabilityConfig={
            {
              //waitForInteraction: true,
              //viewAreaCoveragePercentThreshold: 100
            }
          }
          renderItem={({ item }) => {
            return (
              <Side side={item.side} data={item.data} title={item.title} />
            );
          }}
        />
      </View>
      <FavoriteButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryColor,
    flex: 1
  },
  contentContainer: {
    paddingVertical: 20
    //backgroundColor: "red"
  },
  resultsContainer: {
    marginBottom: 100
  }
});

export default Animal;
