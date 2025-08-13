import {TRootStackParamsList} from "@/app/screens/types";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useState} from "react";
import UIInput from "@/src/components/UI/UIInput";
import {Button, Card} from "react-native-paper";
import {View} from "react-native";

type Props = NativeStackScreenProps<TRootStackParamsList, "Register">;

export default function RegisterScreen({navigation}: Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleRegister = () => {
        console.log('Register');
    }

    return (
        <View className="p-5 my-auto">
            <Card>
                <Card.Content className="flex flex-col gap-2">
                    <UIInput label="Email" value={email} onChangeText={setEmail}/>
                    <UIInput label="Password" value={password} onChangeText={setPassword} secureTextEntry/>
                    <UIInput label="Repeat password" value={repeatPassword} onChangeText={setRepeatPassword}
                             secureTextEntry/>
                    <Button mode="contained" onPress={handleRegister}>Register</Button>
                    <Button onPress={() => navigation.navigate('Login')}>Back to login</Button>
                </Card.Content>
            </Card>
        </View>
    )
}