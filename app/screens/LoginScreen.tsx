import "../global.css"
import { View } from "react-native";
import {useState} from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {TRootStackParamsList} from "@/app/screens/types";
import {Card, Button, TextInput} from "react-native-paper";
import {UIInput} from "@/app/components/UI/UIInput";
import {login} from "@/app/services/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';



type Props = NativeStackScreenProps<TRootStackParamsList, "Login">;

export default function LoginScreen({ navigation }: Props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // TODO: authenticate
        login({ email, password }).then(async (result) => {
            console.log(result);
            await AsyncStorage.setItem("accessToken", result.data.token);
            navigation.replace('Home');
        });
    };

    return (
        <View className="p-5">
            <Card>
                <Card.Content className="flex flex-col gap-2">
                    {/*<Text className="this-does-not-exist">Email</Text>*/}
                    <UIInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        left={<TextInput.Icon icon='email' forceTextInputFocus={false} onPress={undefined} />}
                    />
                    {/*<Text>Password</Text>*/}
                    <UIInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        left={<TextInput.Icon icon='lock' forceTextInputFocus={false} onPress={undefined} />}
                        right={<TextInput.Icon icon='eye' />}
                    />
                    <Button mode="contained" onPress={handleLogin}>Login</Button>
                    <Button mode="contained" onPress={() => navigation.navigate('Register')}>Register</Button>
                </Card.Content>
            </Card>
        </View>
    );
}