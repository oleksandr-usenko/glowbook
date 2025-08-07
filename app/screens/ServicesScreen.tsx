import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {TRootStackParamsList} from "@/app/screens/types";
import {View} from "react-native";
import { Text } from "react-native-paper";

type Props = NativeStackScreenProps<TRootStackParamsList, "Services">


export default function ServicesScreen({ navigation }: Props) {
    return (
        <View>
            <Text>Services</Text>
        </View>
    )
}