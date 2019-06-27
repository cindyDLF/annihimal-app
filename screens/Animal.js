import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";

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
    conservation_status: "Near Threatened",
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
  const presentation = {
    name,
    scientific_name,
    classification,
    group
  };
  const hab = { location, habitat, diet, threat: biggest_threat };
  const info = { size: animal["size_(h)"], weight, lifespan, group_behaviour };
  const repro = { gestation_period, litter: animal["average_litter size"] };

  return (
    <View>
      <StickyHeader conservation_status={animal.conservation_status} />
      <ScrollView>
        <Side side="left" data={presentation} title="Presentation" />
        <Side side="right" data={hab} title="Habitat" />
        <Side side="left" data={info} title="Informations" />
        <Side side="right" data={repro} title="Reproduction" />
      </ScrollView>
    </View>
  );
};

export default Animal;
