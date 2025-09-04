import {View} from "react-native";

type Props = {
    active: boolean;
    isLast: boolean;
}

export const MinuteCell = ({active, isLast}: Props) => {
    return (
        <View style={{flexDirection: "column", gap: 0, alignItems: "center"}}>
            <View style={{
                height: 25,
                width: 50,
                backgroundColor: active ? "green" : "#e2e2e2",
                borderRadius: 4,
                transitionDuration: "1"
            }}></View>
            {!isLast && <View style={{height: 1, width: 60, borderRadius: 4, backgroundColor: "#0000002f"}}></View>}
        </View>
    )
}