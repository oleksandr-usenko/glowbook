export type TScheduleDays = 1 | 4 | 7 | 14 | 30 | 60;

export enum EScheduleDays {
    TODAY = 1,
    FOUR_DAYS = 4,
    WEEK = 7,
    TWO_WEEKS = 14,
    MONTHS = 30,
    TWO_MONTHS = 60,
}

export type TSchedule = {
    start: Date;
    days: TScheduleDays;
    ranges: TScheduleDays[];
}

export type TScheduleRange = {
    start: number;
    end: number;
}

export type TScheduleRangePayload = {
    start: string;
    end: string;
}