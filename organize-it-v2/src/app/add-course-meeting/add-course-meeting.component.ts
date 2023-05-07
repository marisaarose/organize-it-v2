import { Component } from '@angular/core';
import { ScheduleService } from '../schedule.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Course_Meeting } from '../course_meeting';
import { Course } from '../course';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-add-course-meeting',
  templateUrl: './add-course-meeting.component.html',
  styleUrls: ['./add-course-meeting.component.css']
})
export class AddCourseMeetingComponent {
  constructor(private scheduleService: ScheduleService, private courseService: CourseService, private fb: FormBuilder) {}

  course: Course[];
  days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  newmeeting: Course_Meeting = {
    meeting_id: this.scheduleService.nextCMID++,
    course: '',
    location: '',
    day: '',
    start_time: {hours: 0, minutes: 0},
    end_time: {hours: 0, minutes: 0}
  };

  meetingForm = this.fb.group({
    course: ['', Validators.required],
    location: [''],
    day: ['', Validators.required],
    start_time: [{hours: 0, minutes:0}],
    end_time: [{hours: 0, minutes:0}]
  });

  updateValues() {
    this.newmeeting.course = this.meetingForm.value.course!;
    this.newmeeting.location = this.meetingForm.value.location!;
    this.newmeeting.day = this.meetingForm.value.day!;
    this.newmeeting.start_time = this.meetingForm.value.start_time!;
    this.newmeeting.end_time = this.meetingForm.value.end_time!;
  }

  addMeeting() {
    this.scheduleService.addMeeting(this.newmeeting).subscribe(data => {
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
