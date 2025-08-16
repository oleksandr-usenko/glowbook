import {HTTP} from "@/src/services/http";
import {TMediaItem, TService, TUpdateServicePayload} from "@/src/entities/services/types";

export const createService = async (formData: FormData) => {
    return await HTTP.post(`/api/services`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const updateService = async (id: number, payload: TUpdateServicePayload) => {
    return await HTTP.put<TService>(`/api/services/${id}`, payload);
}

export const getServices = async () => {
    return await HTTP.get<TService[]>(`/api/services`);
};

export const addMedia = async (id: number, payload: FormData) => {
    return await HTTP.patch<TService>(`/api/services/${id}/add-media`, payload);
}

export const updateMediaOrder = async (serviceId: number, mediaList: TMediaItem[]) => {
    return await HTTP.patch<TService>(`/api/services/${serviceId}/update-media-order`, {media: mediaList});
}