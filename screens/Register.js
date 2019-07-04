import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage
} from "react-native";
import { withNavigation } from "react-navigation";
import Input from "../components/Input";
import Title from "../components/Title";
import Button from "../components/Button";

import Colors from "../constants/Colors";

import { userRegister, userLogin } from "../api//callApi";
import { makeAlert } from "../utils";

const width = Dimensions.get("window").width;

class Register extends Component {
  state = {
    username: "",
    email: "iam@email.fr",
    password: "Test123",
    password_confirmation: "",
    alreadyRegistered: false
  };

  handleOnChange = (value, text) => {
    this.setState({ [value]: text });
  };

  changeRender = () => {
    const { alreadyRegistered } = this.state;
    this.setState({ alreadyRegistered: !alreadyRegistered });
  };

  login = async () => {
    const { email, password } = this.state;
    const { status, res } = await userLogin({ email, password });
    console.log("STATUS:::", status);
    console.log("RES:::", res);

    if (status != 200) {
      const { errors } = res;
      makeAlert("Error", errors, "OK");
    } else {
      try {
        await AsyncStorage.setItem("@annihimal:user", JSON.stringify(res));
      } catch (error) {
        console.log(error);
      }
      this.props.navigation.navigate("Profile");
    }
  };

  register = async () => {
    const { username, email, password, password_confirmation } = this.state;
    const user = { username, email, password, password_confirmation };
    const { status, res } = await userRegister(user);
    console.log("STATUS:::", status);
    console.log("RES:::", res);

    if (status != 201) {
      const { errors } = res;
      makeAlert("Error", errors, "OK");
    } else {
      this.setState({ alreadyRegistered: true });
    }
  };

  renderRegister = () => {
    const {
      alreadyRegistered,
      username,
      email,
      password,
      password_confirmation
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
            value={password_confirmation}
            handleOnChange={this.handleOnChange}
            name="password_confirmation"
          />
          <Button text="send" onPress={this.register} />
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
          <Button text="send" onPress={this.login} />
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
export default withNavigation(Register);

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
