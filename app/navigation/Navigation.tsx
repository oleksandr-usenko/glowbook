import React, {useContext} from 'react';
import AuthNavigator from './AuthNavigator';
import AuthContext from "@/src/context/AuthContext";
import AppTabs from "@/src/components/HomeTabs";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "@/app/screens/HomeScreen";
import ServicesScreen from "@/app/screens/ServicesScreen";
import CalendarScreen from "@/app/screens/CalendarScreen";
import LoginScreen from "@/app/screens/LoginScreen";
import RegisterScreen from "@/app/screens/RegisterScreen";

export default function AppNavigator() {
    const {isSignedIn, isSignedOut} = useContext(AuthContext);
    const RootStack = createNativeStackNavigator({
        screens: {},
        groups: {
            SignedIn: {
                if: isSignedIn,
                screens: {
                    Home: HomeScreen,
                    Services: ServicesScreen,
                    Calendar: CalendarScreen,
                },
            },
            SignedOut: {
                if: isSignedOut,
                screens: {
                    Login: LoginScreen,
                    Register: RegisterScreen,
                },
            },
        },
    });
    const Stack = createNativeStackNavigator();


    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {isSignedIn() ? (
                <Stack.Screen name="AppTabs" component={AppTabs}/>
            ) : (
                <Stack.Screen name="Auth" component={AuthNavigator}/>
            )}
        </Stack.Navigator>
    );
}
