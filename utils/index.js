import { Alert } from "react-native";

export const makeAlert = (alertTitle, alertTxt, cancelTxt) => {
  let txt;
  if (Array.isArray(alertTxt)) {
    txt = alertTxt.join("\n\n");
  } else {
    txt = alertTxt;
  }
  Alert.alert(alertTitle, txt, [
    {
      text: cancelTxt,
      style: "cancel"
    }
  ]);
};
