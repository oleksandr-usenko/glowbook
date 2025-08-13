import * as React from 'react';
import "../interceptors/refresh.interceptor";
import {Appbar, BottomNavigation, useTheme} from 'react-native-paper';
import {useContext, useState} from "react";
import ServicesScreen from "@/app/screens/ServicesScreen";
import AuthContext from "@/src/context/AuthContext";
import CalendarScreen from "@/app/screens/CalendarScreen";
import HomeScreen from "@/app/screens/HomeScreen";

const HomeRoute = () => <HomeScreen/>;
const CalendarRoute = () => <CalendarScreen/>;
const ServicesRoute = () => <ServicesScreen/>;

export default function AppTabs() {
    const theme = useTheme();

    const {logout} = useContext(AuthContext);

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {key: 'home', title: 'Home', focusedIcon: 'home'},
        {key: 'calendar', title: 'Calendar', focusedIcon: 'calendar'},
        {key: 'services', title: 'Services', focusedIcon: 'creation'},
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: HomeRoute,
        calendar: CalendarRoute,
        services: ServicesRoute,
    });

    const handleLogout = () => {
        logout();
    }

    return (<>
            <Appbar.Header elevated={true} style={{
                backgroundColor: theme.colors.primary,
            }}>
                <Appbar.Content color={theme.colors.background} style={{elevation: 8}} title={routes[index].title}/>
                <Appbar.Action icon="logout" onPress={handleLogout}/>
            </Appbar.Header>
            <BottomNavigation
                sceneAnimationEnabled={true}
                navigationState={{index, routes}}
                onIndexChange={setIndex}
                renderScene={renderScene}
                shifting={false}
                barStyle={{height: 72, backgroundColor: theme.colors.primary}}
                inactiveColor={theme.colors.background}
            />
        </>
    );
}
