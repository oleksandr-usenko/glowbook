import {ScrollView, View} from "react-native";
import {useGetServices} from "@/src/entities/services/queries/useGetServices";
import ServiceItem from "@/src/entities/services/ServiceItem";
import {TService} from "@/src/entities/services/types";
import {Button, Text} from "react-native-paper";
import AddServiceDialog from "@/src/entities/services/AddServiceDialog";
import {useState} from "react";

export default function ServicesScreen() {
    const [addDialogVisible, setAddDialogVisible] = useState(false);
    const [selectedService, setSelectedService] = useState<TService>();
    const {data: services, error, isError} = useGetServices();

    const handleClose = () => {
        setAddDialogVisible(false)
    }

    const editService = (service: TService) => {
        setSelectedService(service);
        setAddDialogVisible(true);
    }

    return (
        <ScrollView className="flex flex-col gap-4 p-4">
            <Button onPress={() => setAddDialogVisible(true)}>Add new service</Button>
            {services && services.map((service) => <View key={service.id} className="mb-4">
                <ServiceItem service={service} onPress={() => editService(service)}/>
            </View>)}
            {isError && <Text>{(error as any).response?.data?.message}</Text>}
            <AddServiceDialog service={selectedService} open={addDialogVisible} onClose={handleClose}/>
        </ScrollView>)
}