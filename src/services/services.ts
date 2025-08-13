import {HTTP} from "@/src/services/http";
import {TService} from "@/src/entities/services/types";

export const createService = async (formData: FormData) => {
    return await HTTP.post(`/api/services`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const getServices = async () => {
    return await HTTP.get<TService[]>(`/api/services`);
};