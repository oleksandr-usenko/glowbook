import React, {useContext} from 'react';
import AuthNavigator from './AuthNavigator';
import {AuthContext} from "@/app/context/AuthContext";
import AppTabs from "@/app/components/HomeTabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "@/app/screens/HomeScreen";
import ServicesScreen from "@/app/screens/ServicesScreen";
import CalendarScreen from "@/app/screens/CalendarScreen";
import LoginScreen from "@/app/screens/LoginScreen";
import RegisterScreen from "@/app/screens/RegisterScreen";

export default function AppNavigator() {
    const { isAuthenticated } = useContext(AuthContext);
    const Stack = createNativeStackNavigator();

    const RootStack = createNativeStackNavigator({
        screens: {},
        groups: {
            SignedIn: {
                if: isAuthenticated,
                screens: {
                    Home: HomeScreen,
                    Services: ServicesScreen,
                    Calendar: CalendarScreen,
                },
            },
            SignedOut: {
                if: !isAuthenticated,
                screens: {
                    Login: LoginScreen,
                    Register: RegisterScreen,
                },
            },
        },
    });

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
                <Stack.Screen name="AppTabs" component={AppTabs} />
            ) : (
                <Stack.Screen name="Auth" component={AuthNavigator} />
            )}
        </Stack.Navigator>
    );
}
