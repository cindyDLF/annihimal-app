import { BASE_URL, SUBCRIBE_USER, LOGIN_USER } from "../endpoint";

export const userRegister = async data => {
  console.log(data);
  try {
    await fetch(BASE_URL + SUBCRIBE_USER, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => {
      console.log(response);
      return response.json();
    });
  } catch (err) {
    console.log(err);
  }
};

export const userLogin = async data => {
  console.log(data);
  try {
    await fetch(BASE_URL + LOGIN_USER, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then(response => {
      console.log(response);
      return response.json();
    });
  } catch (err) {
    console.log(err);
  }
};
