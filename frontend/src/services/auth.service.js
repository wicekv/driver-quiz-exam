import axios from "axios";
import {API_URL} from '../';

const AUTH_PATH = `${API_URL}/auth`

const register = (username, email, password) => {
  return axios.post(`${AUTH_PATH}/signup` , {
    username,
    email,
    password
  });
};

const login = async (username, password) => {
  const response = await axios
    .post(`${AUTH_PATH}/signin`, {
      username,
      password,
    });
  if (response.data.accessToken) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};


const logout = () => {
  localStorage.removeItem("user");
};


export default {
  register,
  login,
  logout,
};