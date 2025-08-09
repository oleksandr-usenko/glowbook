import {ScrollView} from "react-native";
import {useGetServices} from "@/app/entities/services/useGetServices";
import {useEffect} from "react";
import {ServiceItem} from "@/app/entities/services/ServiceItem";
import {TService} from "@/app/entities/services/types";

const ServiceWrapper = (service: TService) =>
    <div key={service.id} className="mb-4">
        <ServiceItem service={service} />
    </div>

export default function ServicesScreen() {
    const { data: services } = useGetServices();
    useEffect(() => {
        console.log(services);
    }, [services])

    return (
        <ScrollView className="flex flex-col gap-4 p-4">
            {services && services.map(ServiceWrapper)}
        </ScrollView>
    )
}