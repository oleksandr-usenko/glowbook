import {useMutation} from "@tanstack/react-query";
import {createSchedule} from "@/src/services/schedule";
import {TScheduleRange} from "@/src/entities/schedule/types";

export const useCreateSchedule = () => {
    return useMutation({
        mutationFn: ({day, ranges}: { day: string; ranges: TScheduleRange[] }) => createSchedule(day, ranges),
    })
}