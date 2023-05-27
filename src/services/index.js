import axios from "axios";

const url = process.env.VUE_APP_BASE_URL;

const api = axios.create({
    baseURL: url + "/api"
});

export default api;