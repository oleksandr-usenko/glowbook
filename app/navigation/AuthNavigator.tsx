import LoginScreen from "@/app/screens/LoginScreen";
import RegisterScreen from "@/app/screens/RegisterScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

export type TAuthStackParamsList = {
    Login: undefined;
    Register: undefined;
}
const Stack = createNativeStackNavigator<TAuthStackParamsList>();

export default function AuthNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    )
}