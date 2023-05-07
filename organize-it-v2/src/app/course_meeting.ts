import { Time } from "@angular/common";

export interface Course_Meeting {
    meeting_id: number;
    course: string;
    location: string;
    day: string;
    start_time: Time;
    end_time: Time;
}