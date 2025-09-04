import axios from "axios";

export const SERVER_BASE = "https://a912901ce1b4.ngrok-free.app";
export const HTTP = axios.create({
    baseURL: SERVER_BASE,
});
axios.defaults.headers.post["Content-Type"] = "application/json";