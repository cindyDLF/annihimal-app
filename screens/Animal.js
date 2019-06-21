import React from "react";
import { ScrollView } from "react-native";
import Side from "../components/Side";

const Animal = () => {
  return (
    <ScrollView>
      <Side side="left" />
      <Side side="right" />
      <Side side="left" />
    </ScrollView>
  );
};

export default Animal;
