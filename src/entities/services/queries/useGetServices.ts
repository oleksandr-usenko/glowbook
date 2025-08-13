import {useQuery} from "@tanstack/react-query";
import {AxiosResponse} from "axios";
import {TService} from "@/src/entities/services/types";
import {getServices} from "@/src/services/service";

export const QUERY_SERVICES = "createServiceQuery";

export const useGetServices = () => {
    return useQuery({
        queryKey: [QUERY_SERVICES],
        staleTime: 60 * 1000,
        queryFn: (): Promise<AxiosResponse<TService[]>> => getServices(),
        // queryFn: getServices,
        select: (response) => response.data,
    });
};