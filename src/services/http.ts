import axios from "axios";

export const SERVER_BASE = "https://58e41e9b0497.ngrok-free.app";
export const HTTP = axios.create({
    baseURL: SERVER_BASE,
});
axios.defaults.headers.post["Content-Type"] = "application/json";