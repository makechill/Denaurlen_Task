import axios from "axios";

const url = "https://coins-crud-app.herokuapp.com";

export const getUser = async () => {
  return await axios.get(`${url}/user`);
};

export const addUser = async (user) => {
  return await axios.post(`${url}/user`, user);
};

export const updateUser = async (coins) => {
  return await axios.put(`${url}/update`, coins);
};
