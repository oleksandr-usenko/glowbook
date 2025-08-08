import * as React from 'react';
import { Text } from 'react-native';
import {Appbar, BottomNavigation, useTheme} from 'react-native-paper';
import {useState} from "react";

const HomeRoute = () => <Text>Home</Text>;
const CalendarRoute = () => <Text>Calendar</Text>;
const ServicesRoute = () => <Text>Services</Text>;

export default function AppTabs() {
    const theme = useTheme();
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'home', title: 'Home', focusedIcon: 'home' },
        { key: 'calendar', title: 'Calendar', focusedIcon: 'calendar' },
        { key: 'services', title: 'Services', focusedIcon: 'brush' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: HomeRoute,
        calendar: CalendarRoute,
        services: ServicesRoute,
    });

    return (<>
        <Appbar.Header elevated={true} style={{
            backgroundColor: theme.colors.primary,
        }}>
            <Appbar.Content style={{ elevation: 8 }} title={routes[index].title} />
        </Appbar.Header>
        <BottomNavigation
            sceneAnimationEnabled={true}
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            shifting={false}
            barStyle={{ height: 72, backgroundColor: theme.colors.primary }}
        />
    </>
    );
}
