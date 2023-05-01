import { Injectable } from '@angular/core';
import { Schedule } from './schedule';
import { Days } from './mock-days';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor() {}

  getDays(): Observable<Schedule[]> {
    const days = of(Days);
    return days;
  }
}
