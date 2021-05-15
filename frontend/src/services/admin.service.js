import axios from "axios";
import { API_URL } from '../';

const ADMIN_PATH = `${API_URL}/admin`

const addQuestion = question =>
    axios.post(ADMIN_PATH, question);

export default {
    addQuestion
};