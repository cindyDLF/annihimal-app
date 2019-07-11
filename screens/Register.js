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
  AsyncStorage,
  Image
} from "react-native";
import * as Animatable from "react-native-animatable";
import { withNavigation } from "react-navigation";
import Input from "../components/Input";
import Title from "../components/Title";
import Button from "../components/Button";

import Colors from "../constants/Colors";
import { logo } from "../assets/images/annihimal-logo.png";

import { userFavorite } from "../api/callApi";

import { userRegister, userLogin } from "../api//callApi";
import { makeAlert } from "../utils";

const width = Dimensions.get("window").width;

class Register extends Component {
  state = {
    username: "",
    email: "iam@email.fr",
    password: "Test123",
    password_confirmation: "",
    alreadyRegistered: true,
    animationStart: "bounceInRight"
  };

  async componentWillMount() {
    try {
      const value = await AsyncStorage.getItem("@annihimal:user");
      if (value !== null) {
        const user = JSON.parse(value);
        if (user.jwt) {
          this.props.navigation.navigate("Profile");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  componentWillUpdate(prevProps, prevState) {
    if (this.state.animationStart === "bounceOutLeft") {
      this.setState({ animationStart: "bounceInRight" });
    }
  }

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

    if (status != 200) {
      const { errors } = res;
      makeAlert("Error", errors, "OK");
    } else {
      try {
        await AsyncStorage.setItem("@annihimal:user", JSON.stringify(res));
        const arrAnimalsFav = await this.getFav(res.jwt, res.user.id);
        await AsyncStorage.setItem(
          "@annihimal:favorite",
          JSON.stringify(arrAnimalsFav)
        );
      } catch (error) {
        console.log(error);
      }

      this.setState({ animationStart: "bounceOutLeft" });
      setTimeout(() => this.props.navigation.navigate("Profile"), 1300);
    }
  };

  register = async () => {
    const { username, email, password, password_confirmation } = this.state;
    const user = { username, email, password, password_confirmation };
    const { status, res } = await userRegister(user);

    if (status != 201) {
      const { errors } = res;
      makeAlert("Error", errors, "OK");
    } else {
      this.setState({ alreadyRegistered: true });
    }
  };

  getFav = async (jwt, id) => {
    try {
      const { res } = await userFavorite(jwt, id);
      return res.animals;
    } catch (err) {
      console.log(err);
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
    const { alreadyRegistered, animationStart } = this.state;

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
              <Animatable.Image
                animation={animationStart}
                style={styles.stretch}
                duration={3000}
                source={require("../assets/images/annihimal-logo.png")}
                style={{
                  width: 100,
                  height: 100,
                  margin: 20
                }}
              />
              <View style={styles.containerSwitch}>
                <TouchableOpacity
                  onPress={() => this.setState({ alreadyRegistered: true })}
                  style={styles.buttonSwitchLeft}
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
                  onPress={() => this.setState({ alreadyRegistered: false })}
                  style={styles.buttonSwitchRight}
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
  buttonSwitchRight: {
    backgroundColor: "white",
    width: (width - 50) / 2,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.05,
    shadowRadius: 1
  },
  buttonSwitchLeft: {
    backgroundColor: "white",
    width: (width - 50) / 2,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    borderRightWidth: 0.5,
    borderColor: Colors.mainColor,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.05,
    shadowRadius: 1
  },
  containerSwitch: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20
  },
  textButtonSwitch: {
    fontFamily: "Avenir",
    fontSize: 20,
    color: Colors.mainColor
  },
  textButtonSwitchActive: {
    fontFamily: "Avenir",
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.mainColor
  },
  containerHeader: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  }
});
