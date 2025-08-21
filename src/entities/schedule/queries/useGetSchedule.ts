import {useQuery} from "@tanstack/react-query";
import {TSchedule, TScheduleDays} from "@/src/entities/schedule/types";
import {getSchedule} from "@/src/services/schedule";
import {AxiosResponse} from "axios";

export const QUERY_SCHEDULE = "query-schedule";

export const useGetSchedule = (days: TScheduleDays) => {
    return useQuery({
        queryKey: [QUERY_SCHEDULE, days],
        queryFn: () => getSchedule(days)
    })
}