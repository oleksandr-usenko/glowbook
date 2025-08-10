// AuthContext.tsx
import React, {createContext, useState, useEffect, PropsWithChildren} from 'react';
import {clearToken, getToken} from '../utils/authStorage';

export const AuthContext = createContext({
    isSignedIn: (): boolean => false,
    isSignedOut: (): boolean => true,
    setIsAuthenticated: (value: boolean) => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const isSignedIn = () => isAuthenticated;
    const isSignedOut = () => !isAuthenticated;

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
        <AuthContext.Provider value={{ isSignedIn, isSignedOut, setIsAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
