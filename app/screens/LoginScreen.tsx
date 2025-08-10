import "../global.css"
import { View } from "react-native";
import {useContext, useState} from "react";
import {Card, Button, TextInput, Text} from "react-native-paper";
import {UIInput} from "@/app/components/UI/UIInput";
import {login} from "@/app/services/auth";
import {setToken} from "@/app/utils/authStorage";
import {AuthContext} from "@/app/context/AuthContext";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {TRootStackParamsList} from "@/app/screens/types";
import {TAPIError} from "@/app/services/types.http";
import {UIErrorMessage} from "@/app/components/UI/UIErrorMessage";

type Props = NativeStackScreenProps<TRootStackParamsList, "Login">

export default function LoginScreen({ navigation }: Props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<TAPIError | null>(null);
    const { setIsAuthenticated } = useContext(AuthContext);

    const handleLogin = () => {
        login({ email, password })
            .then(async (result) => {
                console.log(result);
                Promise
                    .all([setToken("accessToken", result.data.token), await setToken("refreshToken", result.data.refresh_token)])
                    .then(() => {
                        setIsAuthenticated(true);
                    })
            })
            .catch((err) => {
                setError(err.response?.data || { message: err.message || 'Unknown error' });
            });
    };

    return (
        <View className="p-5 my-auto">
            <Card>
                <Card.Content className="flex flex-col gap-2">
                    <UIInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        left={<TextInput.Icon icon='email' forceTextInputFocus={false} onPress={undefined} />}
                    />
                    <UIInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        left={<TextInput.Icon icon='lock' forceTextInputFocus={false} onPress={undefined} />}
                        right={<TextInput.Icon icon='eye' />}
                    />
                    {error && <UIErrorMessage message={error.message} />}
                    <Button mode="contained" onPress={handleLogin}>Login</Button>
                    <Button mode="contained" onPress={() => navigation.navigate('Register')}>Register</Button>
                </Card.Content>
            </Card>
        </View>
    );
}