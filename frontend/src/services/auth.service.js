import axios from "axios";
const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};
const submit = (question, answear1, answear2, img) => {
  return axios.post(API_URL + "admin", {
    question,
    answear1,
    answear2,
    img,
  })
  .then((response) => {
    console.log(response);
  });
};
const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getData = () => {
  console.log('here');
  axios.get(API_URL + "admin", {})
  .then(res => console.log(res))
  .catch(err => console.log(err))
}

export default {
  register,
  login,
  logout,
  getCurrentUser,
  submit,
  getData
};