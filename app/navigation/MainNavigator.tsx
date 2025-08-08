import HomeScreen from "@/app/screens/HomeScreen";
import ServicesScreen from "@/app/screens/ServicesScreen";
import CalendarScreen from "@/app/screens/CalendarScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

export type TMainStackParamsList = {
    Home: undefined;
    Services: undefined;
    Calendar: undefined;
}
const Tab = createBottomTabNavigator<TMainStackParamsList>();

export default function MainNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Services" component={ServicesScreen} />
            <Tab.Screen name="Calendar" component={CalendarScreen} />
        </Tab.Navigator>
    )
}