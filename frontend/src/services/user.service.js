import axios from "axios";
import {authHeader} from "./auth-header";
import {API_URL} from './index'

const USER_URL = `${API_URL}/user`

export const getQuestions = async () => {
  try {
    const res = await axios.get(`${USER_URL}/questions`, { headers: authHeader() });
    return res.data;
  } catch (err) {
    return console.log(err);
  }
}


export const getCurrentUser = async () => {
  try {
    const res = await axios.get(`${USER_URL}/user`, { headers: authHeader() });
    return res.data;
  } catch (err) {
    return console.log(err);
  }
}