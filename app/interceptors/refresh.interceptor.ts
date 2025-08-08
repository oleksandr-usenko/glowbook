// httpInterceptor.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HTTP, SERVER_BASE } from '../services/http';
import {getToken, setToken} from "@/app/utils/authStorage";

let isRefreshing = false;
let failedQueue: {
    resolve: (token: string) => void;
    reject: (error: any) => void;
}[] = [];

// Helper: Set global Authorization header
export function setAuthHeader(token: string) {
    HTTP.defaults.headers.common['Authorization'] = `${token}`;
}
// Handle retry queue
const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token!);
        }
    });
    failedQueue = [];
};

// Axios interceptor
HTTP.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: (token: string) => {
                            originalRequest.headers['Authorization'] = token;
                            resolve(HTTP(originalRequest));
                        },
                        reject: reject,
                    });
                });
            }

            isRefreshing = true;

            return new Promise(async (resolve, reject) => {
                try {
                    const refreshToken = await getToken('refreshToken');

                    if (!refreshToken) {
                        throw new Error('No refresh token found');
                    }

                    const res = await axios.post(
                        `${SERVER_BASE}/api/auth/refresh`,
                        { refreshToken }, // If you use JSON body
                        // {}, // If your backend expects no body and uses HttpOnly cookies (not RN-friendly)
                        {
                            headers: { 'Content-Type': 'application/json' },
                        }
                    );

                    const newToken = res.data.accessToken;

                    await setToken('accessToken', newToken);
                    setAuthHeader(newToken);
                    processQueue(null, newToken);

                    originalRequest.headers['Authorization'] = newToken;
                    resolve(HTTP(originalRequest));
                } catch (err) {
                    processQueue(err, null);
                    reject(err);
                } finally {
                    isRefreshing = false;
                }
            });
        }

        return Promise.reject(error);
    }
);
