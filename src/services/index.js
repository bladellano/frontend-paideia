import axios from "axios";

const url = process.env.VUE_APP_BASE_URL;
const localStorage = window.localStorage;

const api = axios.create({
    baseURL: url + "/api",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

export default api;