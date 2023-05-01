import { Injectable } from '@angular/core';
import { Schedule } from './schedule';
import { Days } from './mock-days';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor() {}

  getDays(): Schedule[] {
    return Days;
  }
}
