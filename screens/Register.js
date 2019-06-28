import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import Input from "../components/Input";
import Title from "../components/Title";
import Button from "../components/Button";

import Colors from "../constants/Colors";
const width = Dimensions.get("window").width;

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password_confirm: "",
    alreadyRegistered: false
  };
  handleOnChange = (value, text) => {
    this.setState({ [value]: text });
  };

  changeRender = () => {
    const { alreadyRegistered } = this.state;
    this.setState({ alreadyRegistered: !alreadyRegistered });
  };

  renderRegister = () => {
    const {
      alreadyRegistered,
      username,
      email,
      password,
      password_confirm
    } = this.state;
    if (!alreadyRegistered) {
      return (
        <View style={styles.subContainer}>
          <Input
            placeholder="username"
            value={username}
            handleOnChange={this.handleOnChange}
            name="username"
          />
          <Input
            placeholder="email"
            value={email}
            handleOnChange={this.handleOnChange}
            name="email"
          />
          <Input
            placeholder="password"
            value={password}
            handleOnChange={this.handleOnChange}
            name="password"
          />
          <Input
            placeholder="password confirm"
            value={password_confirm}
            handleOnChange={this.handleOnChange}
            name="password_confirm"
          />
          <Button text="send" />
        </View>
      );
    } else {
      return (
        <View style={styles.subContainer}>
          <Input
            placeholder="email"
            value={email}
            handleOnChange={this.handleOnChange}
            name="email"
          />
          <Input
            placeholder="password"
            value={password}
            handleOnChange={this.handleOnChange}
            name="password"
          />
          <Button text="send" />
        </View>
      );
    }
  };

  render() {
    const { alreadyRegistered } = this.state;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ backgroundColor: Colors.primaryColor }}
        >
          <View style={styles.container}>
            <View style={styles.containerHeader}>
              <Title text="annihimal" />
              <View style={styles.containerSwitch}>
                <TouchableOpacity
                  onPress={this.changeRender}
                  style={styles.buttonSwitch}
                >
                  <Text
                    style={
                      alreadyRegistered
                        ? styles.textButtonSwitchActive
                        : styles.textButtonSwitch
                    }
                  >
                    sign in
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={this.changeRender}
                  style={styles.buttonSwitch}
                >
                  <Text
                    style={
                      !alreadyRegistered
                        ? styles.textButtonSwitchActive
                        : styles.textButtonSwitch
                    }
                  >
                    sign up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            {this.renderRegister()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryColor
  },
  subContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  buttonSwitch: {
    backgroundColor: Colors.mainColor,
    width: (width - 50) / 2,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderWidth: 1
  },
  containerSwitch: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20
  },
  textButtonSwitch: {
    fontFamily: "Avenir",
    fontSize: 20
  },
  textButtonSwitchActive: {
    fontFamily: "Avenir",
    fontSize: 20,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  containerHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  }
});
