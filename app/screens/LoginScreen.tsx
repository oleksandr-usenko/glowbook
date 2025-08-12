import "../global.css"
import {KeyboardAvoidingView, TouchableWithoutFeedback, View, Platform, Keyboard} from "react-native";
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
    const [secureInput, setSecureInput] = useState(true);
    const [error, setError] = useState<TAPIError | null>(null);
    const { setIsAuthenticated } = useContext(AuthContext);

    const handleDismissKeyboard = (event: any) => {
        const tagName = event?.target?.tagName;
        if (tagName !== "INPUT" && tagName !== "TEXTAREA") {
            Keyboard.dismiss();
        }
    };

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

    const toggleSecureInput = () => {
        setSecureInput((prev) => !prev);
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <TouchableWithoutFeedback onPress={handleDismissKeyboard} accessible={false}>
                <View style={{ flex: 1, justifyContent: "center" }} className="p-5" onResponderRelease={Keyboard.dismiss}>
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
                                secureTextEntry={secureInput}
                                left={<TextInput.Icon icon='lock' forceTextInputFocus={false} onPress={undefined} />}
                                right={<TextInput.Icon icon='eye' onPress={toggleSecureInput} />}
                            />
                            {error && <UIErrorMessage message={error.message} />}
                            <Button mode="contained" onPress={handleLogin}>Login</Button>
                            <Button mode="contained" onPress={() => navigation.navigate('Register')}>Register</Button>
                        </Card.Content>
                    </Card>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}