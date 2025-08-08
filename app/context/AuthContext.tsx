// AuthContext.tsx
import React, {createContext, useState, useEffect, PropsWithChildren} from 'react';
import {getToken} from '../utils/authStorage';

export const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: (value: boolean) => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        (async () => {
            const token = await getToken("accessToken");
            setIsAuthenticated(!!token);
        })();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
