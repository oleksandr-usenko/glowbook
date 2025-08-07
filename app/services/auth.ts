import {HTTP} from "@/app/services/http";

type TAuthPayload = {
    email: string;
    password: string;
};

export const login = async (payload: TAuthPayload) => {
    return await HTTP.post(`/api/auth/login`, payload, { withCredentials: true });
};

export const register = async (payload: TAuthPayload) => {
    return await HTTP.post(`/api/auth/signup`, payload);
};