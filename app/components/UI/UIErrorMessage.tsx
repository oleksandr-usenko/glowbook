import { Text } from "react-native-paper";

type Props = {
    message: string;
}

export const UIErrorMessage = ({ message }: Props)=>  {
    return <Text style={{
        color: "red",
        padding: 4,
    }}>{message}</Text>
}