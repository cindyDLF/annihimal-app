import React from "react";
import { StyleSheet, View } from "react-native";
import AppNavigator from "./navigation/AppNavigator";

import Colors from "./constants/Colors";

const App = () => {
  console.disableYellowBox = true;
  return (
    <View style={styles.container}>
      <AppNavigator />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.primaryColor
  }
});
