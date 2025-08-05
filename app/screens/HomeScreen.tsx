import {Button, View, Text} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {TRootStackParamsList} from "@/app/screens/types";

type Props = NativeStackScreenProps<TRootStackParamsList, "Home">

export default function HomeScreen({ navigation }: Props){
    return (
        <View>
            <Text>Home</Text>
            <Button title="Logout" onPress={() => navigation.navigate('Login')} />
        </View>
    )
}