import { Injectable } from '@angular/core';
import { Schedule } from './schedule';
import { Days } from './mock-days';
import { Event } from './event';
import { Observable, of, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddEventComponent } from './add-event/add-event.component';
import { Course_Meeting } from './course_meeting';
import { AddCourseMeetingComponent } from './add-course-meeting/add-course-meeting.component';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient, public dialog: MatDialog) {}
  nextID: number = 0;
  nextEvID: number = 0;
  nextCMID: number = 0;

  getDays(): Observable<Schedule[]> {
    const days = of(Days);
    return days;
  }

  newDialogAdd() {
    const dialogRef = this.dialog.open(AddEventComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      location.reload();
    });
  }

  newMeetingDialog() {
    const dialogRef = this.dialog.open(AddCourseMeetingComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  addEvent(newEvent: Event) {
    return this.http.put(
      'https://organize-it-140cc-default-rtdb.firebaseio.com/events/' +
        newEvent.event_id +
        '.json',
      newEvent
    );
  }

  addMeeting(newMeeting: Course_Meeting) {
    return this.http.put(
      'https://organize-it-140cc-default-rtdb.firebaseio.com/course_meetings/' +
        newMeeting.meeting_id +
        '.json',
      newMeeting
    );
  }
}
