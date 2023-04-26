import { WeekDay } from "@angular/common";

export interface Course_Meeting {
    meeting_id: number;
    course_id: number;
    location: string;
    day: WeekDay;
    start_time: number;
    end_time: number;
}