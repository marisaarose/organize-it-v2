import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../course';
import { CourseService } from '../course.service';
import { Course_Meeting } from '../course_meeting';
import { EditCourseMeetingComponent } from '../edit-course-meeting/edit-course-meeting.component';
import { EditInstructorComponent } from '../edit-instructor/edit-instructor.component';
import { Instructor } from '../instructor';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) private data: Course, private courseService: CourseService, private scheduleService: ScheduleService, private dialog: MatDialog) {}
  course: Course = this.data;
  courseid: string = "";
  viewid: string = "view-" + this.course.course_id;
  counter: number = 0;
  meetings: Course_Meeting[];
  course_meetings: Course_Meeting[];
  colors = [ '#ab43d4', '#edbf2a', '#fa5a4c', '#6fbe54', '#2d83ef', '#e28a1c', '#483cd1'];
  weekdays: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  instructor: Instructor;

  getLetter(day: string){
    return day.split("")[0];
  }

  convertDetails() {
    var parser = new DOMParser();
    var currentDetails = this.course.details;
    var element = document.querySelector("#" + this.viewid + ' .course-details')!;
    while(this.counter < 1){
      element.appendChild(parser.parseFromString(currentDetails, 'text/html').body);
      this.counter++;
    }
  }

  getMeetings() {
    this.scheduleService.getMeetings().subscribe(data => {
      this.meetings = data;
      var cmeetings = [];
      for(var i = 0; i < this.meetings.length; i++){
        if(this.meetings[i].course == this.course.course_id.toString()){
          cmeetings.push(this.meetings[i]);
        }
      }
      this.course_meetings = cmeetings;
    });
  }

  editCourse() {
    this.courseService.newDialogEdit(this.data);
  }

  openDialogC(): void {
    const dialogRef = this.dialog.open(DeleteCDialog, {
      data: this.course,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      location.reload();
    });
  }

  openDialogI(): void {
    const dialogRef = this.dialog.open(DeleteIDialog, {
      data: this.instructor,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      location.reload();
    });
  }

  newDialog(type: string) {
    if(type == 'meeting'){
      this.scheduleService.newMeetingDialog();
    } else if(type == 'instructor'){
      this.courseService.newInstructorsDialog();
    }
  }

  editInstrDialog(): void {
    const dialogRef = this.dialog.open(EditInstructorComponent, {
      data: this.instructor,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      location.reload();
    });
  }

  editCMDialog(meeting: Course_Meeting): void {
    const dialogRef = this.dialog.open(EditCourseMeetingComponent, {
      data: meeting,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      location.reload();
    });
  }

  getTimeString(meeting: Course_Meeting){
    var start = '' + meeting.start_time + '';
    var end = '' + meeting.end_time + '';
    var starthalf = 'PM';
    var endhalf = 'PM';
    var starthour = Number.parseInt(start.split(':')[0]);
    var endhour = Number.parseInt(end.split(':')[0]);
    if(Number.parseInt(start.split(':')[0]) < 12){
      starthalf = 'AM';
    } else {
      starthour = Number.parseInt(start.split(':')[0]) % 12;
    }
    if(Number.parseInt(end.split(':')[0]) < 12){
      endhalf = 'AM';
    } else {
      endhour = Number.parseInt(end.split(':')[0]) % 12;
    }

    return "from " + starthour + ":" + start.split(':')[1] + " " + starthalf + " to " + endhour + ":" + end.split(':')[1] + " " + endhalf;
  }


  ngOnInit(): void {
    this.getMeetings();
    this.instructor = this.courseService.getProf(this.course.course_id);
    if(this.course.type == "in-person"){
      this.course.type = "In-Person";
    }
  }
}
@Component({
  selector: 'delete-dialog',
  template: `<mat-dialog-content>
  <h1 mat-dialog-title>Delete Course</h1>
  <div mat-dialog-content>Are you sure you would like to delete this course?</div>
  <div mat-dialog-actions style="display:flex;">
    <button mat-stroked-button color="basic" [mat-dialog-close]="true">No</button>
    <button mat-stroked-button color="warn" [mat-dialog-close]="true" (click)='this.deleteCourse()'>Yes</button>
  </div>
  </mat-dialog-content>
  `,
})
export class DeleteCDialog {
  constructor(@Inject(MAT_DIALOG_DATA) private data: Course, public dialogRef: MatDialogRef<DeleteCDialog>, private courseService: CourseService) {}

  deleteCourse(){
    this.courseService.deleteCourse(Number(this.data.course_id)).subscribe();
  }
}

@Component({
  selector: 'delete-dialog',
  template: `<mat-dialog-content>
  <h1 mat-dialog-title>Delete Instructor</h1>
  <div mat-dialog-content>Are you sure you would like to delete this instructor?</div>
  <div mat-dialog-actions style="display:flex;">
    <button mat-stroked-button color="basic" [mat-dialog-close]="true">No</button>
    <button mat-stroked-button color="warn" [mat-dialog-close]="true" (click)='this.deleteInstructor()'>Yes</button>
  </div>
  </mat-dialog-content>
  `,
})
export class DeleteIDialog {
  constructor(@Inject(MAT_DIALOG_DATA) private data: Instructor, public dialogRef: MatDialogRef<DeleteCDialog>, private courseService: CourseService) {}

  deleteInstructor(){
    this.courseService.deleteInstructor(Number(this.data.instructor_id)).subscribe();
  }
}