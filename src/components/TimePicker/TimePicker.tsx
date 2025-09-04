import {View, Text} from "react-native";
import {useState} from "react";
import {TimePickerHour} from "@/src/components/TimePicker/TimePickerHour";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {MinutePicker} from "@/src/components/TimePicker/MinutePicker";
import {TScheduleRange, TScheduleRangePayload} from "@/src/entities/schedule/types";
import {Button} from "react-native-paper";

type Intervals = {
    [key: number]: TScheduleRange[] | undefined;
}

const ROW_LENGTH = 8;

export const TimePicker = () => {
    const [minutePickerOpen, setMinutePickerOpen] = useState(false);
    const [editingHour, setEditingHour] = useState<number | null>(null);

    const [intervals, setIntervals] = useState<Intervals>({});

    const [test, setTest] = useState("");

    const isPartial = (hour: number) => {
        const ints = intervals[hour];

        if (!ints) return false;
        return ints[0].start !== 0 || ints[0].end !== 60;
    }

    const selectHour = (hour: number) => {
        setIntervals((state) => {
            const newState = {...state};
            if (newState[hour]) {
                newState[hour] = undefined;
            } else {
                newState[hour] = [{start: 0, end: 60}];
            }
            return newState;
        })
    }

    const openMinutePicker = (hour: number) => {
        setEditingHour(hour);
        setMinutePickerOpen(true);
    }

    const closeMinutePicker = (intervals: TScheduleRange[]) => {
        setMinutePickerOpen(false);
        if (editingHour) {
            setIntervals((state) => {
                const newState = {...state};
                if (newState[editingHour]) {
                    newState[editingHour] = undefined;
                } else {
                    newState[editingHour] = intervals;
                }
                return newState;
            });
        }
        setEditingHour(null);
    }


    const formatTime = (hour: number, minute: number): string =>
        `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;

    const transformIntervals = () => {
        const res = [];
        let activeInterval: TScheduleRangePayload | null = null;

        Object.keys(intervals).forEach((h) => {
            const hour = +h < 10 ? `0${h}` : h;
            const ints = intervals[+h] ?? [];
            ints.forEach((int: TScheduleRange) => {
                const startMinutes = int.start < 10 ? `0${int.start}` : int.start;
                const endMinutes = int.end < 10 ? `0${int.end}` : int.end;
                if (!activeInterval) {
                    activeInterval = {
                        start: `${hour}:${startMinutes}`,
                        end: `${hour}:${endMinutes}`,
                    }
                } else {
                    const activeIntervalHour = parseInt(activeInterval.end.split(":")[0]);
                    const activeIntervalMinute = parseInt(activeInterval.end.split(":")[1]);
                    if (
                        (activeIntervalHour === +h && (activeIntervalMinute === +int.start || (activeIntervalMinute - 1) === +int.start)) ||
                        (activeIntervalHour === (+h - 1) && (activeIntervalMinute === 59 || activeIntervalMinute === 60) && +int.start === 0)
                    ) {
                        activeInterval.end = `${hour}:${endMinutes}`
                    } else {
                        res.push(activeInterval);
                        activeInterval = {
                            start: `${hour}:${startMinutes}`,
                            end: `${hour}:${endMinutes}`,
                        }
                    }
                }
            })
        });
        res.push(activeInterval);

        return res;
    };

    const handleSave = () => {
        setTest(JSON.stringify(transformIntervals()));
    }


    return (
        <View style={{flex: 1}}>
            <Text>{test}</Text>
            <GestureHandlerRootView style={{flex: 1, flexDirection: "column", alignItems: "center"}}>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        width: 327,
                        maxHeight: 100,
                        margin: 32,
                        justifyContent: "space-evenly",
                        alignItems: "center",
                    }}
                >
                    {[...Array(ROW_LENGTH)].map((_, i) => <TimePickerHour key={i}
                                                                          noDivider={i === 7}
                                                                          hour={i}
                                                                          partial={isPartial(i)}
                                                                          active={!!intervals[i]}
                                                                          onPress={() => selectHour(i)}
                                                                          onLongPress={() => openMinutePicker(i)}
                    />)}
                </View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        width: 327,
                        maxHeight: 100,
                        margin: 32,
                        justifyContent: "space-evenly",
                        alignItems: "center",
                    }}
                >
                    {[...Array(ROW_LENGTH)].map((_, i) => i + 8 * 1).map((i) => <TimePickerHour key={i}
                                                                                                noDivider={i === 15}
                                                                                                hour={i}
                                                                                                partial={isPartial(i)}
                                                                                                active={!!intervals[i]}
                                                                                                onPress={() => selectHour(i)}
                                                                                                onLongPress={() => openMinutePicker(i)}
                    />)}
                </View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: "row",
                        width: 327,
                        maxHeight: 100,
                        margin: 32,
                        justifyContent: "space-evenly",
                        alignItems: "center",
                    }}
                >
                    {[...Array(ROW_LENGTH)].map((_, i) => i + 8 * 2).map((i) => <TimePickerHour key={i}
                                                                                                noDivider={i === 23}
                                                                                                hour={i}
                                                                                                partial={isPartial(i)}
                                                                                                active={!!intervals[i]}
                                                                                                onPress={() => selectHour(i)}
                                                                                                onLongPress={() => openMinutePicker(i)}
                    />)}
                </View>
                <Button mode="contained" onPress={handleSave} icon="check">Save</Button>
                {editingHour && <MinutePicker open={minutePickerOpen} hour={editingHour} close={closeMinutePicker}/>}
            </GestureHandlerRootView>
        </View>
    );
};