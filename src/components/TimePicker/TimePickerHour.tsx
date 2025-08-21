import {View} from "react-native";
import {Pressable} from "react-native-gesture-handler"
import {TimePickerHourDivider} from "@/src/components/TimePicker/TimePickerHourDivider";

type TimePickerHourProps = {
    active: boolean;
    onPress: () => void;
    noDivider: boolean;
}

export const TimePickerHour = ({active, onPress, noDivider}: TimePickerHourProps) => {
    return (<View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            <Pressable
                onPress={onPress}
                pointerEvents="box-none"
                style={{
                    height: 80,
                    width: 40,
                    backgroundColor: active ? "green" : "#e2e2e2",
                    borderRadius: 4,
                    transitionDuration: "1",
                }}
            ></Pressable>
            {!noDivider && <TimePickerHourDivider/>}
        </View>
    )
}