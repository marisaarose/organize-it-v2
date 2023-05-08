import { Component, OnInit } from '@angular/core';
import { Schedule } from '../schedule';
import { ScheduleService } from '../schedule.service';
import { Event } from '../event';
import { Course_Meeting } from '../course_meeting';
import { CourseService } from '../course.service';
import { Time } from '@angular/common';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent {
  days: Schedule[] = [];
  currentDay: number = 0;
  futureDays: number[] = [];
  selectedDay: number = this.currentDay;
  selectedDate: Date = new Date();
  weekdays: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  weekday: string = this.weekdays[this.selectedDay];
  month: string = this.months[this.selectedDate.getMonth()];
  meetings: Course_Meeting[];
  events: Event[];
  day_meetings: any[] = [];

  constructor(
    private scheduleService: ScheduleService,
    private courseService: CourseService
  ) {}

  getDayLetter(num: number) {
    switch (num) {
      case 0:
      case 6:
        return 'S';
      case 1:
        return 'M';
      case 2:
      case 4:
        return 'T';
      case 3:
        return 'W';
      case 5:
        return 'F';
      default:
        return '';
    }
  }

  getVariables() {
    var today = new Date();
    this.currentDay = today.getDay();
    var temp = today.getDay() + 1;
    for (var i = 0; i < 6; i++) {
      if (temp == 6) {
        this.futureDays.push(temp);
        temp = 0;
      } else {
        this.futureDays.push(temp);
        temp++;
      }
    }
  }

  colorDays() {
    var days = Array.from(
      document.getElementsByClassName(
        'sch-day'
      ) as HTMLCollectionOf<HTMLElement>
    );
    var colors = [
      '#ab43d4',
      '#edbf2a',
      '#fa5a4c',
      '#6fbe54',
      '#2d83ef',
      '#e28a1c',
      '#483cd1',
    ];
    for (var i = 0; i < days.length; i++) {
      days[i].style.backgroundColor = colors[i];
    }
  }

  getCourseName(meeting: Course_Meeting) {
    return this.courseService.getCourse(meeting.course).name;
  }

  getCourseColor(meeting: Course_Meeting) {
    return this.courseService.getCourse(meeting.course).color;
  }

  getProf(meeting: Course_Meeting) {
    var prof = this.courseService.getProf(
      this.courseService.getCourse(meeting.course).instructor
    );
    return prof.first_name + ' ' + prof.last_name;
  }

  newDialog() {
    this.scheduleService.newDialogAdd();
  }

  openDay(day: number) {
    this.day_meetings = [];
    this.selectedDay = day;
    var today = new Date();
    today.setDate(today.getDate() + this.futureDays.indexOf(day) + 1);
    this.selectedDate = today;
    this.weekday = this.weekdays[day];
    this.month = this.months[today.getMonth()];
    this.getMeetings();
    this.getEvents();
    this.sortMeetings(this.day_meetings)
  }

  getMeetings() {
    this.scheduleService.getMeetings().subscribe((data) => {
      this.meetings = data;
      this.getDayMeetings(data);
    });
  }

  getEvents() {
    this.scheduleService.getEvents().subscribe((data) => {
      this.events = data;
      this.getDayEvents(data);
    });
  }

  getDayMeetings(meetings: Course_Meeting[]) {
    for (var i = 0; i < meetings.length; i++) {
      if (meetings[i] != null) {
        if (meetings[i].day == this.weekday) {
          this.day_meetings.push(meetings[i]);
        }
      }
    }
  }

  getDayEvents(events: Event[]){
    for(var i = 0; i < events.length; i++){
      if(events[i] != null){
        var parsed = events[i].date.toString();
        var parsedst = parsed.split('-');
        var temp = new Date(parsed);
        temp.setDate(Number.parseInt(parsedst[2]));
        if(temp.getDay() == this.selectedDay){
          this.day_meetings.push(events[i]);
        }
      }
    }
  }

  sortMeetings(meetings: Course_Meeting[]) {
    meetings.sort(function (a, b) {
      var c = a.start_time;
      var d = b.start_time;
      return c.hours - d.hours;
    });
  }

  ngOnInit(): void {
    this.getVariables();
    this.getMeetings();
    this.getEvents();
  }
}