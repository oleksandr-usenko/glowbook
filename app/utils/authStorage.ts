// authStorage.ts
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async (tokenType: "accessToken" | "refreshToken", token: string) => {
    if (await SecureStore.isAvailableAsync()) {
        return await SecureStore.setItemAsync(tokenType, token);
    } else {
        return await AsyncStorage.setItem(tokenType, token);
    }
}

export const getToken = async (tokenType: "accessToken" | "refreshToken") => {
    if (await SecureStore.isAvailableAsync()) {
        return await SecureStore.getItemAsync(tokenType);
    } else {
        return await AsyncStorage.getItem(tokenType);
    }
}

export const clearToken = async (tokenType: "accessToken" | "refreshToken") => {
    if (await SecureStore.isAvailableAsync()) {
        return await SecureStore.deleteItemAsync(tokenType);
    } else {
        return await AsyncStorage.setItem(tokenType, "");
    }
}

const GetMobile = SecureStore.getItemAsync;

async function setTokenWeb(tokenType: "accessToken" | "refreshToken", token: string) {
    await AsyncStorage.setItem(tokenType, token);
}

async function setTokenMobile(tokenType: "accessToken" | "refreshToken", token: string) {
    await SecureStore.setItemAsync(tokenType, token);
}

export async function setAccessToken(token: string) {
    await SecureStore.setItemAsync('accessToken', token);
}

export async function getAccessToken() {
    return await SecureStore.getItemAsync('accessToken');
}

export async function clearAccessToken() {
    await SecureStore.deleteItemAsync('accessToken');
}

export async function setRefreshToken(token: string) {
    await SecureStore.setItemAsync('refreshToken', token);
}

export async function getRefreshToken() {
    return await SecureStore.getItemAsync('refreshToken');
}

export async function clearRefreshToken() {
    await SecureStore.deleteItemAsync('refreshToken');
}
