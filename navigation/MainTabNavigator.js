import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import Home from "../screens/Home";
import Animal from "../screens/Animal";
import ListAnimals from "../screens/ListAnimals";
import Profil from "../screens/Profil";
import Register from "../screens/Register";

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      //this will hide the header
      navigationOptions: {}
    }
  },
  { headerMode: "none" }
);

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={"random"} />
};

const ListAnimalsStack = createStackNavigator(
  {
    Animals: ListAnimals,
    Animal: Animal
  },
  {
    initialRouteName: "Animals",
    headerMode: "none"
  }
);

ListAnimalsStack.navigationOptions = {
  tabBarLabel: "Animals",
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={"hippo"} />
};

const UserStack = createStackNavigator(
  {
    Register: Register,
    User: Profil
  },
  { headerMode: "none" }
);
UserStack.navigationOptions = {
  tabBarLabel: "User",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"user-alt"} />
  )
};

export default createBottomTabNavigator({
  UserStack,
  HomeStack,
  ListAnimalsStack
});
