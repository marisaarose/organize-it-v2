import { Time } from "@angular/common";

export interface Event {
    event_id: number;
    title: string;
    date: Date;
    start_time: Time;
    end_time: Time;
    notes: string;
}