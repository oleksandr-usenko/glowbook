import {Dimensions, LayoutChangeEvent, NativeUIEvent, PanResponder, View} from "react-native";
import {useLayoutEffect, useRef, useState} from "react";
import {Text} from "react-native-paper";
import {TimePickerHour} from "@/src/components/TimePicker/TimePickerHour";
import {GestureDetector, GestureHandlerRootView} from "react-native-gesture-handler";

type ContainerDimensions = {
    x: number;
    y: number;
    width: number;
    height: number;
}

const ROW_LENGTH = 8;
const DIVIDER_WIDTH = 2;

export const TimePicker = () => {
    const [coords, setCoords] = useState({x: 0, y: 0});

    const [hourCellSize, setHourCellSize] = useState(0);
    const [morningContainerDimensions, setMorningContainerDimensions] = useState<ContainerDimensions | null>(null);

    const [activeCells, setActiveCells] = useState<number[]>([]);
    const [tc, setTc] = useState<number>(0);

    const [test, setTest] = useState<string>("");

    const setMorningContainer = ((event: LayoutChangeEvent) => {
        const {x, y, width, height} = event.nativeEvent.layout;
        setMorningContainerDimensions({x, y, width, height});
        setHourCellSize(Math.floor((width - (ROW_LENGTH - 1) * DIVIDER_WIDTH) / ROW_LENGTH))
    });

    const selectHour = (hour: number) => {
        setTest("Test");
        if (!activeCells.includes(hour)) setActiveCells([...activeCells, hour]);
        else setActiveCells(activeCells.filter(c => c !== hour));
    }

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,  // 👈 important
            onMoveShouldSetPanResponder: () => false,   // 👈 important
            onPanResponderGrant: (evt) => {
                if (!morningContainerDimensions) return;

                const x = evt.nativeEvent.locationX;

                const targetCell = Math.floor(x / ROW_LENGTH);
                console.log(targetCell);
                setTc(targetCell);
                if (!activeCells.includes(targetCell)) setActiveCells([...activeCells, targetCell]);
                setCoords({
                    x: evt.nativeEvent.locationX,
                    y: evt.nativeEvent.locationY,
                });
            },
            onPanResponderMove: (evt, gestureState) => {
                setCoords({
                    x: evt.nativeEvent.locationX,
                    y: evt.nativeEvent.locationY,
                });
            },
            onPanResponderRelease: () => {
            },
            onPanResponderTerminate: () => {
            },
        })
    ).current;

    return (
        <GestureHandlerRootView style={{flex: 1, maxHeight: 200, alignItems: "center"}}>
            <Text>
                X: {coords.x.toFixed(2)}, Y: {coords.y.toFixed(2)}
            </Text>
            <Text>
                Hour cell size: {hourCellSize}
                Active cells: {activeCells}
                TargetCell: {tc}
                {test}
            </Text>
            <Text>
                Container dimms: {JSON.stringify(morningContainerDimensions)}
            </Text>
            <View
                onLayout={setMorningContainer}
                style={{
                    flex: 1,
                    flexDirection: "row",
                    width: 327,
                    maxHeight: 100,
                    margin: 32,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                }}
                {...panResponder.panHandlers}
            >
                {[...Array(ROW_LENGTH)].map((_, i) => <TimePickerHour key={i}
                                                                      noDivider={i === 7}
                                                                      active={activeCells.includes(i)}
                                                                      onPress={() => selectHour(i)}
                />)}
            </View>
        </GestureHandlerRootView>
    );
};