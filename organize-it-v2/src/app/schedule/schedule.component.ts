import { Component } from '@angular/core';
import { Schedule } from '../schedule';

import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent {
  selectedDay?: Schedule;
  days: Schedule[] = [];

  constructor(private scheduleService: ScheduleService) {}
  onSelect(day: Schedule): void {
    this.selectedDay = day;
  }
  schedule: Schedule = {
    id: 1,
    day: 'Wednesday',
  };
  getDays(): void {
    this.scheduleService.getDays().subscribe((days) => (this.days = days));
  }
  ngOnInit(): void {
    this.getDays();
  }
}
