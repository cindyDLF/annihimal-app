import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import Animal from "../screens/Animal";
import ListAnimals from "../screens/ListAnimals";
import Profil from "../screens/Profil";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={"random"} />
};

const ListAnimalsStack = createStackNavigator({
  Animals: ListAnimals
});

ListAnimalsStack.navigationOptions = {
  tabBarLabel: "Animals",
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={"hippo"} />
};

const UserStack = createStackNavigator({
  User: Profil
});
UserStack.navigationOptions = {
  tabBarLabel: "User",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"user-alt"} />
  )
};

const AnimalStack = createStackNavigator({
  Animal: Animal
});

export default createBottomTabNavigator({
  HomeStack,
  ListAnimalsStack,
  UserStack
});
