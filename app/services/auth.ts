import {HTTP} from "@/app/services/http";

type TAuthPayload = {
    email: string;
    password: string;
};

export const publicRoutes = ["/api/auth/login", "/api/auth/signup"];

export const login = async (payload: TAuthPayload) => {
    return await HTTP.post(publicRoutes[0], payload, { withCredentials: true });
};

export const register = async (payload: TAuthPayload) => {
    return await HTTP.post(publicRoutes[1], payload);
};