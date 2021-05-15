import axios from "axios";
import authHeader from "./auth-header";



const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};


const getQuestions = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() })
  .then(res => res.data)
  .catch(err => console.log(err))
}

export default {
  getPublicContent,
  getUserBoard,
  getQuestions,
};