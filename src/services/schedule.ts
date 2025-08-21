import {HTTP} from "@/src/services/http";
import {TScheduleDays, TScheduleRange} from "@/src/entities/schedule/types";

export const getSchedule = async (days: TScheduleDays) => {
    const res = await HTTP.get("/api/schedule", {params: {days}});
    return res.data;
}

export const createSchedule = async (day: string, ranges: TScheduleRange[]) => {
    const res = await HTTP.post(`/api/schedule/${day}`, ranges);
    return res.data;
}