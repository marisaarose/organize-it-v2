import { Component, Input } from '@angular/core';
import { Schedule } from '../schedule';
import { ScheduleService } from '../schedule.service';
@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.css'],
})
export class ScheduleDetailComponent {
  @Input() day?: Schedule;
}
