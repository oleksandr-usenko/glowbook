import {Text} from "react-native-paper";

type Props = {
    message: string;
}

const UIErrorMessage = ({message}: Props) => {
    return <Text style={{
        color: "red",
        padding: 4,
    }}>{message}</Text>
}

export default UIErrorMessage;