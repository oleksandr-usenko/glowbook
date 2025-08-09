import {useQuery} from "@tanstack/react-query";
import {AxiosResponse} from "axios";
import {TService} from "@/app/entities/services/types";
import {getServices} from "@/app/services/service";

export const GET_MY_SERVICES_QUERY = "createServiceQuery";

export const useGetServices = () => {
    return useQuery({
        queryKey: [GET_MY_SERVICES_QUERY],
        staleTime: 60 * 1000,
        queryFn: (): Promise<AxiosResponse<TService[]>> => getServices(),
        // queryFn: getServices,
        select: (response) => response.data,
    });
};