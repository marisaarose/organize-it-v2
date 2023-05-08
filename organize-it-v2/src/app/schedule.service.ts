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
import { EditEventComponent } from './edit-event/edit-event.component';
import { ScheduleDetailComponent } from './schedule-detail/schedule-detail.component';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpClient, public dialog: MatDialog) {}
  nextID: number = 0;
  nextEvID: number = 0;
  nextCMID: number = 0;
  meetings: Course_Meeting[];
  events: Event[];

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

  newDialogEdit(event: Event) {
    const dialogRef = this.dialog.open(EditEventComponent, {
      data: event,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      //location.reload();
    });
  }

  newDialogView(event: Event) {
    const dialogRef = this.dialog.open(ScheduleDetailComponent, {
      data: event,
    });
    dialogRef.afterClosed().subscribe((result) => {
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

  editEvent(event: Event) {
    return this.http.put(
      'https://organize-it-140cc-default-rtdb.firebaseio.com/events/' +
        event.event_id +
        '.json',
      event
    );
  }

  deleteEvent(id: number) {
    return this.http.delete(
      'https://organize-it-140cc-default-rtdb.firebaseio.com/events/' +
        id +
        '.json'
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

  getMeetings() {
    return this.http
      .get<Course_Meeting[]>(
        'https://organize-it-140cc-default-rtdb.firebaseio.com/' + 'course_meetings.json'
      )
      .pipe(
        map((responseData) => {
          const meetingsArray: Course_Meeting[] = [];
          for (const key in responseData) {
            meetingsArray.push(responseData[key]);
          }
          this.nextCMID = (meetingsArray[meetingsArray.length-1].meeting_id)+1;
          this.meetings = meetingsArray;
          return meetingsArray;
        })
      );
  }

  getEvents() {
    return this.http
      .get<Event[]>(
        'https://organize-it-140cc-default-rtdb.firebaseio.com/' + 'events.json'
      )
      .pipe(
        map((responseData) => {
          const eventsArray: Event[] = [];
          for (const key in responseData) {
            eventsArray.push(responseData[key]);
          }
          this.nextEvID = (eventsArray[eventsArray.length-1].event_id)+1;
          this.events = eventsArray;
          return eventsArray;
        })
      );
  }
}
