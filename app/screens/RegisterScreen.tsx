import {TRootStackParamsList} from "@/app/screens/types";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {Button, Text, TextInput, View} from "react-native";
import {useState} from "react";

type Props = NativeStackScreenProps<TRootStackParamsList, "Register">;

export default function RegisterScreen({ navigation }: Props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleRegister = () => {
        console.log('Register');
    }

    return (
        <View style={{ padding: 20 }}>
            <Text>Email</Text>
            <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" />
            <Text>Password</Text>
            <TextInput value={password} onChangeText={setPassword} secureTextEntry />
            <Text>Repeat password</Text>
            <TextInput value={repeatPassword} onChangeText={setRepeatPassword} secureTextEntry />
            <Button title="Login" onPress={handleRegister} />
            <Button title="Login" onPress={() => navigation.navigate('Login')} />
        </View>
    )
}