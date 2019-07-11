import { AsyncStorage } from "react-native";

export const getUserAsync = async () => {
  const payload = await AsyncStorage.getItem("@annihimal:user");
  const user = JSON.parse(payload);
  return user;
};
