import "./global.css";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "@/app/screens/LoginScreen";
import {TRootStackParamsList} from "@/app/screens/types";
import RegisterScreen from "@/app/screens/RegisterScreen";
import HomeScreen from "@/app/screens/HomeScreen";

const Stack = createNativeStackNavigator<TRootStackParamsList>();

export default function Index() {
  return (
      <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
  );
}
