import {ScrollView, View} from "react-native";
import {useGetServices} from "@/src/entities/services/queries/useGetServices";
import ServiceItem from "@/src/entities/services/ServiceItem";
import {TService} from "@/src/entities/services/types";
import {Button} from "react-native-paper";
import AddServiceDialog from "@/src/entities/services/AddServiceDialog";
import {useState} from "react";

const ServiceWrapper = (service: TService) =>
    <View key={service.id} className="mb-4">
        <ServiceItem service={service}/>
    </View>

export default function ServicesScreen() {
    const [addDialogVisible, setAddDialogVisible] = useState(false);
    const {data: services} = useGetServices();

    return (
        <ScrollView className="flex flex-col gap-4 p-4">
            <Button onPress={() => setAddDialogVisible(true)}>Add new service</Button>
            {services && services.map(ServiceWrapper)}
            <AddServiceDialog open={addDialogVisible} onClose={() => setAddDialogVisible(false)}/>
        </ScrollView>)
}