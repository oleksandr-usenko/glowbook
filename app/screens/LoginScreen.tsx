import "../global.css"
import { Button, TextInput, View, Text} from "react-native";
import {useState} from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {TRootStackParamsList} from "@/app/screens/types";


type Props = NativeStackScreenProps<TRootStackParamsList, "Login">;

export default function LoginScreen({ navigation }: Props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // TODO: authenticate
        navigation.replace('Home');
    };

    return (
        <View className="bg-blue-700 p-5">
            <Text className="this-does-not-exist">Email</Text>
            <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" />
            <Text>Password</Text>
            <TextInput value={password} onChangeText={setPassword} secureTextEntry />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Register" onPress={() => navigation.navigate('Register')} />
        </View>
    );
}