import axios from "axios";
import { API_URL } from './index';

const ADMIN_PATH = `${API_URL}/admin`

const addQuestion = question =>
    axios.post(`${ADMIN_PATH}/questions`, question);

export default {
    addQuestion
};