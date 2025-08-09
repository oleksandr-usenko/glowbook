// AuthContext.tsx
import React, {createContext, useState, useEffect, PropsWithChildren} from 'react';
import {clearToken, getToken} from '../utils/authStorage';

export const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: (value: boolean) => {
    },
    logout: () => {
    },
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const logout = () => {
        Promise
            .all([clearToken("accessToken"), clearToken("refreshToken")])
            .then(() => setIsAuthenticated(false));
    }

    useEffect(() => {
        (async () => {
            const token = await getToken("accessToken");
            setIsAuthenticated(!!token);
        })();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
