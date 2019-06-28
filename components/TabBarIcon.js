import React from "react";
import { Icon } from "expo";
import { Image } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import Colors from "../constants/Colors";

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <FontAwesome5
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.primaryColor : Colors.tabIconDefault}
      />
    );
  }
}
