import axios from "axios";
import { authHeader } from "./auth-header";
import { API_URL } from './index';

const ADMIN_PATH = `${API_URL}/admin`

export const addQuestion = question =>
    axios.post(`${ADMIN_PATH}/questions`, question, { headers: authHeader() });

