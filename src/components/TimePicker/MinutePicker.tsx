import {View} from "react-native";
import {useMemo, useState} from "react";
import UIDialog from "@/src/components/UI/UIDialog";
import {Picker} from 'react-native-wheel-pick'
import {Button, Text, Icon, IconButton, Chip} from "react-native-paper";
import {TScheduleRange} from "@/src/entities/schedule/types";

const MINUTES = [...Array(61)].map((_, i) => i);

type Props = {
    open: boolean;
    close: (ints: TScheduleRange[]) => void;
    hour: number;
}

const DialogContent = ({hour, close}: { hour: number; close: (ints: TScheduleRange[]) => void; }) => {
    const [start, setStart] = useState<number | null>(null);
    const [end, setEnd] = useState<number | null>(null);
    const [intervals, setIntervals] = useState<TScheduleRange[]>([]);

    const sortedIntervals = useMemo(() => {
        return intervals.sort((a, b) => a.start - b.start);
    }, [intervals]);

    const minutes = useMemo(() => {
        return intervals.reduce((mins: number[], interval) => {
            return mins.filter(m => !(m >= interval.start && m <= interval.end))
        }, [...MINUTES]);
    }, [intervals]);

    const startMinutes = useMemo(() => {
        if (!end) return minutes;
        return [...minutes.filter(m => m < end)];
    }, [end, minutes]);

    const endMinutes = useMemo(() => {
        if (!start) return minutes;
        return [...minutes.filter(m => m > start)];
    }, [start, minutes]);

    const changeStart = (m: number) => {
        setStart(m);
    }

    const changeEnd = (m: number) => {
        setEnd(m);
    }


    const addInterval = () => {
        setIntervals(state => {
            return [...state, {start: start ?? minutes[0], end: end ?? minutes[0]}]
        });
        const next = startMinutes.find(m => m > (start ?? minutes[0]));
        setStart(next ?? minutes[0]);
        setEnd(null);

    };

    const removeInterval = (index: number) => {
        setIntervals(state => state.filter((_, i) => i !== index));
        // setStart(null);
        setEnd(null);
    };

    const handleClose = () => {
        close(sortedIntervals);
    }

    return (
        <View style={{height: 500, width: 300, flexDirection: "column", alignItems: "center"}}>
            <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", gap: 8, width: 308}}>
                {sortedIntervals.map((interval, i) => (
                    <Chip theme={{roundness: 4}} style={{width: 150}} key={i}
                          onClose={() => removeInterval(i)}
                          elevated>{hour}:{interval.start < 10 ? `0${interval.start}` : interval.start} - {hour}:{interval.end < 10 ? `0${interval.end}` : interval.end}</Chip>
                ))}
            </View>
            <View style={{
                flexDirection: "row",
                width: 300,
                height: 200,
                alignItems: undefined,
                justifyContent: "space-evenly",
            }}>
                <View>
                    <Picker
                        style={{width: 100, height: 200, backgroundColor: "transparent"}}
                        selectedValue={start ?? minutes[0]}
                        pickerData={startMinutes}
                        onValueChange={changeStart}
                    />
                </View>
                <View>
                    <Picker
                        style={{width: 100, height: 100, backgroundColor: "transparent"}}
                        selectedValue={end ?? minutes[0]}
                        pickerData={endMinutes}
                        onValueChange={changeEnd}
                    />
                </View>
            </View>
            <Button icon="timelapse" mode="contained" onPress={addInterval}>Add interval</Button>
            <Text>Start: {start}, end: {end}</Text>
            <Button icon="check" mode="contained" onPress={handleClose}>Save</Button>
        </View>

    );
}

export const MinutePicker = ({open, close, hour}: Props) => {
    return (
        <UIDialog
            visible={open}
            onDismiss={() => close}
            style={{backgroundColor: "white", maxHeight: 600}}
            title="Create custom schedule"
            content={<DialogContent close={close} hour={hour}/>}
        />
    );
}