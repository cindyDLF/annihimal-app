import {
  BASE_URL,
  SUBSCRIBE_USER,
  LOGIN_USER,
  ANIMAL_LIST,
  ANIMAL,
  LIST_USER_FAV,
  FAVORITE,
  RANDOM,
  ADD_USER_FAVORITE
} from "./endpoint";

export const userRegister = async data => {
  try {
    const ret = await fetch(BASE_URL + SUBSCRIBE_USER, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const { status } = ret;
    const res = await ret.json();
    return { status, res };
  } catch (err) {
    console.log(err);
  }
};

export const userLogin = async data => {
  try {
    const ret = await fetch(BASE_URL + LOGIN_USER, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    const { status } = ret;
    const res = await ret.json();
    return { status, res };
  } catch (err) {
    console.log(err);
  }
};

export const getAnimalList = async () => {
  try {
    const ret = await fetch(BASE_URL + ANIMAL_LIST, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    const { status } = ret;
    const res = await ret.json();
    return { status, res };
  } catch (err) {
    console.log(err);
  }
};

export const getAnimal = async id => {
  try {
    const ret = await fetch(BASE_URL + ANIMAL + id, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    const { status } = ret;
    const res = await ret.json();
    return { status, res };
  } catch (err) {
    console.log(err);
  }
};

export const getCarousel = async nb => {
  try {
    const ret = await fetch(BASE_URL + RANDOM + nb, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    const { status } = ret;
    const res = await ret.json();
    return { status, res };
  } catch (err) {
    console.log(err);
  }
};

export const userFavorite = async (token, id) => {
  const ret = await fetch(BASE_URL + LIST_USER_FAV + id + FAVORITE, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  });
  const { status } = ret;
  const res = await ret.json();
  //  console.log(res);
  return { status, res };
};

export const addUserFavorite = async (token, idUser, idAnimal) => {
  const ret = await fetch(BASE_URL + ADD_USER_FAVORITE, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({
      userId: idUser,
      animalId: idAnimal
    })
  });
  const { status } = ret;
  const res = await ret.json();
  console.log(res, status);
  return { status, res };
};
