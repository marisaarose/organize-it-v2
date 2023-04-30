import { Component } from '@angular/core';
import { Schedule } from '../schedule';
import { Days } from '../mock-days';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent {
  days = Days;
  selectedDay?: Schedule;

  onSelect(day: Schedule): void {
    this.selectedDay = day;
  }
  schedule: Schedule = {
    id: 1,
    day: 'Wednesday',
  };
}
