import { Component, Inject, OnInit } from '@angular/core';
import { Course_Meeting } from '../course_meeting';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ScheduleService } from '../schedule.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Course } from '../course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-edit-course-meeting',
  templateUrl: './edit-course-meeting.component.html',
  styleUrls: ['./edit-course-meeting.component.css']
})
export class EditCourseMeetingComponent implements OnInit{
  constructor(@Inject(MAT_DIALOG_DATA) private data: Course_Meeting, private scheduleService: ScheduleService, private courseService: CourseService, private fb: FormBuilder, private dialog: MatDialog) {}

  course: Course[];
  days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  updmeeting: Course_Meeting = {
    meeting_id: this.data.meeting_id,
    course: '',
    location: '',
    day: '',
    start_time: {hours: 0, minutes: 0},
    end_time: {hours: 0, minutes: 0}
  };

  meetingForm = this.fb.group({
    course: [this.data.course, Validators.required],
    location: [this.data.location],
    day: [this.data.day, Validators.required],
    start_time: [this.data.start_time, Validators.required],
    end_time: [this.data.end_time, Validators.required]
  });

  updateValues() {
    this.updmeeting.course = this.meetingForm.value.course!;
    this.updmeeting.location = this.meetingForm.value.location!;
    this.updmeeting.day = this.meetingForm.value.day!;
    this.updmeeting.start_time = this.meetingForm.value.start_time!;
    this.updmeeting.end_time = this.meetingForm.value.end_time!;
  }

  addMeeting() {
    this.scheduleService.addMeeting(this.updmeeting).subscribe(data => {
    })
  }

  getCourses() {
    this.courseService.getCourses().subscribe(data => {
      this.course = data;
    })
  }

  onSubmit() {
    this.updateValues();
    this.addMeeting();
  }

  ngOnInit(): void {
    this.getCourses();
  }

}