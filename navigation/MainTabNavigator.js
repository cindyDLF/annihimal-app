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

export default createBottomTabNavigator(
  {
    HomeStack,
    ListAnimalsStack,
    UserStack
  },
  {
    tabBarOptions: {
      activeTintColor: "#6F9B45", // active icon color
      //inactiveTintColor: "#586589", // inactive icon color
      style: {
        backgroundColor: "#4D3A34" // TabBar background
      }
    }
  }
);
