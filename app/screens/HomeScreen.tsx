import {View, Text} from "react-native";
import {useGetSchedule} from "@/src/entities/schedule/queries/useGetSchedule";
import {Button} from "react-native-paper";
import {createSchedule} from "@/src/services/schedule";
import {useCreateSchedule} from "@/src/entities/schedule/queries/useCreateSchedule";
import {useState} from "react";
import {TimePicker} from "@/src/components/TimePicker/TimePicker";

export default function HomeScreen() {
    const {data: schedule} = useGetSchedule(1);
    const {mutateAsync: createSchedule, data} = useCreateSchedule();

    const [response, setResponse] = useState("");

    const handleSchedule = async () => {
        const res = await createSchedule({
            day: "2025-08-19",
            ranges: [
                {start: "8:00", end: "10:00"},
                {start: "13:00", end: "16:00"},
                {start: "17:00", end: "21:00"},
            ]
        });
        setResponse(res);
    }

    return (
        <View style={{flex: 1}}>
            <Text>Home 12</Text>
            <TimePicker/>
            {/*<Text>{JSON.stringify(schedule)}</Text>*/}
            {/*<Text>Data: {JSON.stringify(data)}</Text>*/}
            {/*<Text>Response: {JSON.stringify(response)}</Text>*/}
            {/*<Button mode="contained-tonal" onPress={handleSchedule}>Add</Button>*/}
        </View>
    )
}