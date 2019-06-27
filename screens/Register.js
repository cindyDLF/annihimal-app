import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import Input from "../components/Input";
import Title from "../components/Title";
import Button from "../components/Button";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password_confirm: ""
  };
  handleOnChange = (value, text) => {
    this.setState({ [value]: text });
  };
  render() {
    const { username, email, password, password_confirm } = this.state;
    console.log(username);

    return (
      <View style={styles.container}>
        <Title text="Register" />
        <Input
          placeholder="Username"
          value={username}
          handleOnChange={this.handleOnChange}
          name="username"
        />
        <Input
          placeholder="Email"
          value={email}
          handleOnChange={this.handleOnChange}
          name="email"
        />
        <Input
          placeholder="Password"
          value={password}
          handleOnChange={this.handleOnChange}
          name="password"
        />
        <Input
          placeholder="Password confirm"
          value={password_confirm}
          handleOnChange={this.handleOnChange}
          name="password_confirm"
        />
        <Button text="Register" />
      </View>
    );
  }
}
export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#6F9B45"
  }
});
