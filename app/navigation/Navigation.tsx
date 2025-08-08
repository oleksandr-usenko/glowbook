import React, {useContext} from 'react';
import AuthNavigator from './AuthNavigator';
import {AuthContext} from "@/app/context/AuthContext";
import AppTabs from "@/app/components/HomeTabs";

export default function AppNavigator() {
    const { isAuthenticated } = useContext(AuthContext);


    // Here you would use your real auth logic (context, redux, async storage, etc.)
    return isAuthenticated ? <AppTabs /> : <AuthNavigator />
}
