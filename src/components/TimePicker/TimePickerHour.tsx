import {View, Text} from "react-native";
import {Pressable} from "react-native-gesture-handler"
import {TimePickerHourDivider} from "@/src/components/TimePicker/TimePickerHourDivider";
import {useTheme} from "react-native-paper";

type TimePickerHourProps = {
    active: boolean;
    hour: number;
    onPress: () => void;
    onLongPress: () => void;
    noDivider: boolean;
    partial: boolean;
}

export const TimePickerHour = ({active, hour, onPress, onLongPress, noDivider, partial}: TimePickerHourProps) => {
    const theme = useTheme();
    let color = "#e2e2e2";
    if (active) color = theme.colors.primary;
    if (partial) color = theme.colors.tertiaryContainer;

    return (<View style={{position: "relative", display: "flex", flexDirection: "row", alignItems: "center"}}>
            <Pressable
                onPress={onPress}
                onLongPress={onLongPress}
                pointerEvents="box-none"
                style={{
                    height: 80,
                    width: 40,
                    backgroundColor: color,
                    borderRadius: 4,
                    transitionDuration: "1",
                }}
            ></Pressable>
            {(hour === 0 || hour === 8 || hour === 16) &&
              <View style={{position: "absolute", top: -30, left: -20, width: 40, alignItems: "center"}}>
                <Text style={{fontSize: 32}}>{hour}</Text>
              </View>}
            {!noDivider && <View style={{position: "absolute", top: -20, right: -3}}>
              <Text style={{color: "#999"}}>{hour + 1}</Text>
            </View>}
            {noDivider && <View style={{position: "absolute", top: -40, right: -20, width: 40, alignItems: "center"}}>
              <Text style={{fontSize: 32}}>{hour + 1}</Text>
            </View>}
            {!noDivider && <TimePickerHourDivider/>}
        </View>
    )
}