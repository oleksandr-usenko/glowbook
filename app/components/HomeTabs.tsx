import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-paper';

import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ServicesScreen from "../screens/ServicesScreen";
import {TRootStackParamsList} from "@/app/screens/types";

const Tab = createBottomTabNavigator<TRootStackParamsList>();

const HomeTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let icon = 'home';

                    if (route.name === 'Calendar') icon = 'calendar';
                    if (route.name === 'Services') icon = 'brush';

                    return <Icon source={icon} size={size} color={color} />;
                },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Calendar" component={CalendarScreen} />
            <Tab.Screen name="Services" component={ServicesScreen} />
        </Tab.Navigator>
    );
};

export default HomeTabs;
