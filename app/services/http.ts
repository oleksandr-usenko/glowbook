import axios from "axios";

export const SERVER_BASE = "http://localhost:8080";
export const HTTP = axios.create({
    baseURL: SERVER_BASE,
});
axios.defaults.headers.post["Content-Type"] = "application/json";